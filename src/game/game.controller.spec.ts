import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { getModelToken } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { Attempt } from './schemas/attempt.schema';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  const mockGameModel = {
    findById: jest.fn(),
    find: jest.fn(),
  };

  const mockAttemptModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
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

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a game service', () => {
    expect(service).toBeDefined();
  });
});
