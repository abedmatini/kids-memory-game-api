import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { GameService } from './game.service';
import { Game, GameStatus } from './schemas/game.schema';
import { Attempt } from './schemas/attempt.schema';

// Mock UUID
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-1234'),
}));

describe('GameService', () => {
  let service: GameService;
  let mockGameModel: any;
  let mockAttemptModel: any;

  const mockGame = {
    _id: 'test-game-id',
    board: [
      ['cat', 'dog', 'bird', 'fish'],
      ['cat', 'dog', 'bird', 'fish'],
      ['horse', 'sheep', 'cow', 'pig'],
      ['horse', 'sheep', 'cow', 'pig'],
    ],
    matchedCards: [],
    status: GameStatus.IN_PROGRESS,
    startTime: new Date('2025-10-04T12:00:00Z'),
    endTime: null,
    attemptCount: 0,
    save: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    // Mock Game Model
    mockGameModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    }));
    mockGameModel.findById = jest.fn();
    mockGameModel.find = jest.fn();

    // Mock Attempt Model
    mockAttemptModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    }));
    mockAttemptModel.find = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getModelToken(Game.name),
          useValue: mockGameModel,
        },
        {
          provide: getModelToken(Attempt.name),
          useValue: mockAttemptModel,
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewGame', () => {
    it('should create a new game with UUID and shuffled board', async () => {
      const result = await service.createNewGame();

      expect(result).toHaveProperty('gameId');
      expect(result).toHaveProperty('message');
      expect(result.gameId).toBeTruthy();
      expect(typeof result.gameId).toBe('string');
      expect(result.message).toBe('New game created successfully');
      expect(mockGameModel).toHaveBeenCalledTimes(1);
    });

    it('should create game with proper initial state', async () => {
      await service.createNewGame();

      const createdGame = mockGameModel.mock.calls[0][0];
      expect(createdGame).toHaveProperty('_id');
      expect(createdGame).toHaveProperty('board');
      expect(createdGame.board).toHaveLength(4);
      expect(createdGame.board[0]).toHaveLength(4);
      expect(createdGame.matchedCards).toEqual([]);
      expect(createdGame.status).toBe(GameStatus.IN_PROGRESS);
      expect(createdGame.attemptCount).toBe(0);
      expect(createdGame.endTime).toBeNull();
    });
  });

  describe('getGameById', () => {
    it('should return a game when found', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGame),
      });

      const result = await service.getGameById('test-game-id');

      expect(result).toEqual(mockGame);
      expect(mockGameModel.findById).toHaveBeenCalledWith('test-game-id');
    });

    it('should return null when game not found', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await service.getGameById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('getGameState', () => {
    it('should return game state without revealing unmatched cards', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGame),
      });

      const result = await service.getGameState('test-game-id');

      expect(result).toEqual({
        gameId: mockGame._id,
        status: mockGame.status,
        matchedCards: mockGame.matchedCards,
        attemptCount: mockGame.attemptCount,
        startTime: mockGame.startTime,
        endTime: mockGame.endTime,
      });
      expect(result).not.toHaveProperty('board');
    });

    it('should throw NotFoundException when game not found', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getGameState('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getGameState('non-existent-id')).rejects.toThrow(
        "Game with ID 'non-existent-id' not found",
      );
    });
  });

  describe('playRound', () => {
    beforeEach(() => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockGame,
          save: jest.fn().mockResolvedValue(true),
        }),
      });
    });

    it('should successfully play a matching round', async () => {
      const result = await service.playRound('test-game-id', 'A1', 'A2');

      expect(result).toHaveProperty('isMatch');
      expect(result).toHaveProperty('card1');
      expect(result).toHaveProperty('card2');
      expect(result).toHaveProperty('gameCompleted');
      expect(result).toHaveProperty('attemptNumber');
      expect(result.isMatch).toBe(true);
      expect(result.card1.value).toBe('cat');
      expect(result.card2.value).toBe('cat');
      expect(mockAttemptModel).toHaveBeenCalled();
    });

    it('should successfully play a non-matching round', async () => {
      // Create a fresh game mock to avoid state pollution from previous tests
      const freshGameMock = {
        ...mockGame,
        matchedCards: [], // Ensure clean state
        save: jest.fn().mockResolvedValue(true),
      };
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(freshGameMock),
      });

      const result = await service.playRound('test-game-id', 'A1', 'B1');

      expect(result.isMatch).toBe(false);
      expect(result.card1.value).toBe('cat');
      expect(result.card2.value).toBe('dog');
      expect(result.gameCompleted).toBe(false);
    });

    it('should throw BadRequestException for invalid position format', async () => {
      await expect(
        service.playRound('test-game-id', 'Z9', 'A1'),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.playRound('test-game-id', 'Z9', 'A1'),
      ).rejects.toThrow('Invalid card position format');
    });

    it('should throw BadRequestException when selecting same card twice', async () => {
      await expect(
        service.playRound('test-game-id', 'A1', 'A1'),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.playRound('test-game-id', 'A1', 'A1'),
      ).rejects.toThrow('Cannot select the same card twice');
    });

    it('should throw NotFoundException when game not found', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.playRound('non-existent-id', 'A1', 'A2'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when game is completed', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockGame,
          status: GameStatus.COMPLETED,
        }),
      });

      await expect(
        service.playRound('test-game-id', 'A1', 'A2'),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.playRound('test-game-id', 'A1', 'A2'),
      ).rejects.toThrow('Game is already completed');
    });

    it('should throw BadRequestException when selecting already matched cards', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockGame,
          matchedCards: ['A1', 'B1'],
          save: jest.fn().mockResolvedValue(true),
        }),
      });

      await expect(
        service.playRound('test-game-id', 'A1', 'A2'),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.playRound('test-game-id', 'A1', 'A2'),
      ).rejects.toThrow('One or both cards are already matched');
    });

    it('should increment attempt count', async () => {
      const gameMock = {
        ...mockGame,
        matchedCards: [], // Ensure no matched cards
        save: jest.fn().mockResolvedValue(true),
      };
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(gameMock),
      });

      await service.playRound('test-game-id', 'A1', 'B1');

      expect(gameMock.attemptCount).toBe(1);
    });

    it('should detect game completion when all cards matched', async () => {
      const gameMock = {
        ...mockGame,
        matchedCards: [
          'A1',
          'A2',
          'B1',
          'B2',
          'C1',
          'C2',
          'D1',
          'D2',
          'A3',
          'A4',
          'B3',
          'B4',
          'C3',
          'C4',
        ], // 14 cards already matched
        save: jest.fn().mockResolvedValue(true),
      };
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(gameMock),
      });

      const result = await service.playRound('test-game-id', 'D3', 'D4');

      expect(result.gameCompleted).toBe(true);
      expect(gameMock.status).toBe(GameStatus.COMPLETED);
      expect(gameMock.endTime).toBeTruthy();
      expect(gameMock.matchedCards).toHaveLength(16);
    });
  });

  describe('getGameHistory', () => {
    it('should return all attempts for a game', async () => {
      const mockAttempts = [
        {
          attemptNumber: 1,
          positions: ['A1', 'A2'],
          values: ['cat', 'dog'],
          isMatch: false,
          timestamp: new Date(),
        },
        {
          attemptNumber: 2,
          positions: ['A1', 'B1'],
          values: ['cat', 'cat'],
          isMatch: true,
          timestamp: new Date(),
        },
      ];

      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockGame),
      });

      mockAttemptModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockAttempts),
        }),
      });

      const result = await service.getGameHistory('test-game-id');

      expect(result.gameId).toBe('test-game-id');
      expect(result.attempts).toHaveLength(2);
      expect(result.attempts[0].isMatch).toBe(false);
      expect(result.attempts[1].isMatch).toBe(true);
      expect(mockAttemptModel.find).toHaveBeenCalledWith({
        gameId: 'test-game-id',
      });
    });

    it('should throw NotFoundException when game not found', async () => {
      mockGameModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getGameHistory('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getLeaderboard', () => {
    it('should return top 5 completed games sorted correctly', async () => {
      const mockCompletedGames = [
        {
          _id: 'game-1',
          attemptCount: 10,
          startTime: new Date('2025-10-04T12:00:00Z'),
          endTime: new Date('2025-10-04T12:05:00Z'), // 5 min
        },
        {
          _id: 'game-2',
          attemptCount: 10,
          startTime: new Date('2025-10-04T12:00:00Z'),
          endTime: new Date('2025-10-04T12:03:00Z'), // 3 min (faster)
        },
        {
          _id: 'game-3',
          attemptCount: 15,
          startTime: new Date('2025-10-04T12:00:00Z'),
          endTime: new Date('2025-10-04T12:02:00Z'),
        },
      ];

      mockGameModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockCompletedGames),
          }),
        }),
      });

      const result = await service.getLeaderboard();

      expect(result).toHaveLength(3);
      expect(result[0].gameId).toBe('game-1');
      expect(result[0].attemptCount).toBe(10);
      expect(result[0].durationMs).toBe(300000); // 5 minutes in ms
      expect(mockGameModel.find).toHaveBeenCalledWith({
        status: GameStatus.COMPLETED,
      });
    });

    it('should return empty array when no completed games', async () => {
      mockGameModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      const result = await service.getLeaderboard();

      expect(result).toEqual([]);
    });

    it('should limit results to 5 games', async () => {
      mockGameModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockImplementation((num) => ({
            exec: jest.fn().mockResolvedValue([]),
          })),
        }),
      });

      await service.getLeaderboard();

      const sortReturn = mockGameModel.find().sort();
      expect(sortReturn.limit).toHaveBeenCalledWith(5);
    });
  });
});
