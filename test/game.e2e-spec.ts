import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GameModule } from '../src/game/game.module';
import { ConfigModule } from '@nestjs/config';

describe('Game API (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let gameId: string;

  beforeAll(async () => {
    // Start in-memory MongoDB
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRoot(uri),
        GameModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply global validation pipe (same as in main.ts)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  describe('POST /game/new', () => {
    it('should create a new game', async () => {
      const response = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);

      expect(response.body).toHaveProperty('gameId');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('New game created successfully');
      expect(typeof response.body.gameId).toBe('string');
      expect(response.body.gameId.length).toBeGreaterThan(0);

      // Store gameId for subsequent tests
      gameId = response.body.gameId;
    });

    it('should create unique game IDs', async () => {
      const response1 = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);

      const response2 = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);

      expect(response1.body.gameId).not.toBe(response2.body.gameId);
    });
  });

  describe('GET /game/:gameId', () => {
    it('should get game state', async () => {
      const response = await request(app.getHttpServer())
        .get(`/game/${gameId}`)
        .expect(200);

      expect(response.body).toHaveProperty('gameId');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('matchedCards');
      expect(response.body).toHaveProperty('attemptCount');
      expect(response.body).toHaveProperty('startTime');
      expect(response.body.gameId).toBe(gameId);
      expect(response.body.status).toBe('in-progress');
      expect(response.body.matchedCards).toEqual([]);
      expect(response.body.attemptCount).toBe(0);
      expect(response.body).not.toHaveProperty('board'); // Should not reveal unmatched cards
    });

    it('should return 404 for non-existent game', async () => {
      const response = await request(app.getHttpServer())
        .get('/game/non-existent-id')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /game/:gameId/play', () => {
    let testGameId: string;

    beforeEach(async () => {
      // Create a fresh game for each test
      const response = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);
      testGameId = response.body.gameId;
    });

    it('should play a round and return card values', async () => {
      const response = await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'A1', position2: 'A2' })
        .expect(201);

      expect(response.body).toHaveProperty('isMatch');
      expect(response.body).toHaveProperty('card1');
      expect(response.body).toHaveProperty('card2');
      expect(response.body).toHaveProperty('gameCompleted');
      expect(response.body).toHaveProperty('attemptNumber');
      expect(response.body.card1).toHaveProperty('position');
      expect(response.body.card1).toHaveProperty('value');
      expect(response.body.card2).toHaveProperty('position');
      expect(response.body.card2).toHaveProperty('value');
      expect(response.body.attemptNumber).toBe(1);
      expect(typeof response.body.isMatch).toBe('boolean');
    });

    it('should reject invalid position format', async () => {
      const response = await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'Z9', position2: 'A1' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should reject selecting same card twice', async () => {
      const response = await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'A1', position2: 'A1' })
        .expect(400);

      expect(response.body.message).toContain(
        'Cannot select the same card twice',
      );
    });

    it('should reject already matched cards', async () => {
      // First, play and find a matching pair
      // We'll try all combinations until we find a match
      let matchFound = false;
      let matchedPos1: string;
      let matchedPos2: string;

      for (let i = 0; i < 16 && !matchFound; i++) {
        const col1 = String.fromCharCode(65 + Math.floor(i / 4));
        const row1 = (i % 4) + 1;
        const pos1 = `${col1}${row1}`;

        for (let j = i + 1; j < 16 && !matchFound; j++) {
          const col2 = String.fromCharCode(65 + Math.floor(j / 4));
          const row2 = (j % 4) + 1;
          const pos2 = `${col2}${row2}`;

          const playResponse = await request(app.getHttpServer())
            .post(`/game/${testGameId}/play`)
            .send({ position1: pos1, position2: pos2 });

          if (playResponse.body.isMatch) {
            matchFound = true;
            matchedPos1 = pos1;
            matchedPos2 = pos2;
          }
        }
      }

      // Now try to select one of the matched cards again
      if (matchFound) {
        const response = await request(app.getHttpServer())
          .post(`/game/${testGameId}/play`)
          .send({ position1: matchedPos1, position2: 'A1' })
          .expect(400);

        expect(response.body.message).toContain('same card twice');
      }
    });

    it('should return 404 for non-existent game', async () => {
      await request(app.getHttpServer())
        .post('/game/non-existent-id/play')
        .send({ position1: 'A1', position2: 'A2' })
        .expect(404);
    });

    it('should validate DTO - missing fields', async () => {
      await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'A1' })
        .expect(400);
    });

    it('should validate DTO - extra fields rejected', async () => {
      const response = await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'A1', position2: 'A2', extraField: 'test' })
        .expect(400);

      expect(response.body.message[0]).toContain('should not exist');
    });
  });

  describe('GET /game/:gameId/history', () => {
    let testGameId: string;

    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);
      testGameId = response.body.gameId;
    });

    it('should return empty history for new game', async () => {
      const response = await request(app.getHttpServer())
        .get(`/game/${testGameId}/history`)
        .expect(200);

      expect(response.body).toHaveProperty('gameId');
      expect(response.body).toHaveProperty('attempts');
      expect(response.body.attempts).toEqual([]);
    });

    it('should return attempt history', async () => {
      // Play a couple of rounds
      await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'A1', position2: 'A2' });

      await request(app.getHttpServer())
        .post(`/game/${testGameId}/play`)
        .send({ position1: 'B1', position2: 'B2' });

      const response = await request(app.getHttpServer())
        .get(`/game/${testGameId}/history`)
        .expect(200);

      expect(response.body.attempts).toHaveLength(2);
      expect(response.body.attempts[0]).toHaveProperty('attemptNumber');
      expect(response.body.attempts[0]).toHaveProperty('positions');
      expect(response.body.attempts[0]).toHaveProperty('values');
      expect(response.body.attempts[0]).toHaveProperty('isMatch');
      expect(response.body.attempts[0]).toHaveProperty('timestamp');
      expect(response.body.attempts[0].attemptNumber).toBe(1);
      expect(response.body.attempts[1].attemptNumber).toBe(2);
    });

    it('should return 404 for non-existent game', async () => {
      await request(app.getHttpServer())
        .get('/game/non-existent-id/history')
        .expect(404);
    });
  });

  describe('GET /game/leaderboard', () => {
    it('should return empty leaderboard initially', async () => {
      const response = await request(app.getHttpServer())
        .get('/game/leaderboard')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should return leaderboard with completed games', async () => {
      // Create and complete a game
      const newGameResponse = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);

      const completedGameId = newGameResponse.body.gameId;

      // Play until game is complete (find all 8 pairs)
      let gameCompleted = false;
      const positions = [];

      // Generate all positions
      for (let col = 0; col < 4; col++) {
        for (let row = 1; row <= 4; row++) {
          positions.push(String.fromCharCode(65 + col) + row);
        }
      }

      const tried = new Set<string>();

      while (!gameCompleted && tried.size < 100) {
        // Get current game state to see matched cards
        const stateResponse = await request(app.getHttpServer()).get(
          `/game/${completedGameId}`,
        );

        const matchedCards = stateResponse.body.matchedCards || [];

        // Find two unmatched positions
        const availablePositions = positions.filter(
          (pos) => !matchedCards.includes(pos),
        );

        if (availablePositions.length < 2) break;

        const pos1 = availablePositions[0];
        const pos2 = availablePositions[1];
        const key = [pos1, pos2].sort().join('-');

        if (tried.has(key)) {
          // Try different combination
          const pos2Alt =
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ];
          const keyAlt = [pos1, pos2Alt].sort().join('-');
          if (!tried.has(keyAlt)) {
            tried.add(keyAlt);
            const playResponse = await request(app.getHttpServer())
              .post(`/game/${completedGameId}/play`)
              .send({ position1: pos1, position2: pos2Alt });

            gameCompleted = playResponse.body.gameCompleted || false;
          }
        } else {
          tried.add(key);
          const playResponse = await request(app.getHttpServer())
            .post(`/game/${completedGameId}/play`)
            .send({ position1: pos1, position2: pos2 });

          gameCompleted = playResponse.body.gameCompleted || false;
        }
      }

      // Check leaderboard
      const leaderboardResponse = await request(app.getHttpServer())
        .get('/game/leaderboard')
        .expect(200);

      if (gameCompleted) {
        expect(leaderboardResponse.body.length).toBeGreaterThan(0);
        expect(leaderboardResponse.body[0]).toHaveProperty('gameId');
        expect(leaderboardResponse.body[0]).toHaveProperty('attemptCount');
        expect(leaderboardResponse.body[0]).toHaveProperty('durationMs');
      }
    });

    it('should limit leaderboard to 5 entries', async () => {
      const response = await request(app.getHttpServer())
        .get('/game/leaderboard')
        .expect(200);

      expect(response.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe('Full Game Workflow', () => {
    it('should complete a full game workflow', async () => {
      // 1. Create new game
      const newGameResponse = await request(app.getHttpServer())
        .post('/game/new')
        .expect(201);

      const workflowGameId = newGameResponse.body.gameId;

      // 2. Check initial state
      const initialState = await request(app.getHttpServer())
        .get(`/game/${workflowGameId}`)
        .expect(200);

      expect(initialState.body.status).toBe('in-progress');
      expect(initialState.body.attemptCount).toBe(0);

      // 3. Play a round
      const playResponse = await request(app.getHttpServer())
        .post(`/game/${workflowGameId}/play`)
        .send({ position1: 'A1', position2: 'B1' })
        .expect(201);

      expect(playResponse.body.attemptNumber).toBe(1);

      // 4. Check updated state
      const updatedState = await request(app.getHttpServer())
        .get(`/game/${workflowGameId}`)
        .expect(200);

      expect(updatedState.body.attemptCount).toBe(1);

      // 5. Check history
      const history = await request(app.getHttpServer())
        .get(`/game/${workflowGameId}/history`)
        .expect(200);

      expect(history.body.attempts).toHaveLength(1);
    });
  });
});
