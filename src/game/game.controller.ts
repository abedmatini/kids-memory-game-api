import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { GameService } from './game.service';
import { PlayRoundDto } from './dto';
import { CardPosition } from './constants/game.constants';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * POST /game/new - Start a new game
   * Returns the game ID and success message
   */
  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new game',
    description:
      'Creates a new memory game session with a shuffled 4x4 board of 8 animal pairs.',
  })
  @ApiResponse({
    status: 201,
    description: 'Game created successfully',
    schema: {
      example: {
        gameId: '550e8400-e29b-41d4-a716-446655440000',
        message: 'New game created successfully',
      },
    },
  })
  async createNewGame() {
    return this.gameService.createNewGame();
  }

  /**
   * POST /game/:gameId/play - Submit two cards for matching
   * Accepts game ID and 2 card positions
   * Returns match result, card values, and game completion status
   */
  @Post(':gameId/play')
  @ApiOperation({
    summary: 'Play a round',
    description:
      'Submit two card positions to attempt a match. Returns the card values and whether they matched.',
  })
  @ApiParam({
    name: 'gameId',
    description: 'The unique game identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: PlayRoundDto,
    description: 'Two card positions to flip',
    examples: {
      validAttempt: {
        value: {
          position1: 'A1',
          position2: 'B2',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Round played successfully',
    schema: {
      example: {
        card1: { position: 'A1', value: 'cat' },
        card2: { position: 'B2', value: 'dog' },
        isMatch: false,
        attemptNumber: 3,
        gameCompleted: false,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or game already completed',
    schema: {
      example: {
        statusCode: 400,
        message: 'Cannot select the same card twice',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Game not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Game not found',
        error: 'Not Found',
      },
    },
  })
  async playRound(
    @Param('gameId') gameId: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    playRoundDto: PlayRoundDto,
  ) {
    const { position1, position2 } = playRoundDto;
    return this.gameService.playRound(
      gameId,
      position1 as CardPosition,
      position2 as CardPosition,
    );
  }

  /**
   * GET /game/leaderboard - Get top 5 games
   * Returns top 5 completed games sorted by fewest attempts, then quickest time
   * NOTE: This must come BEFORE :gameId route to avoid route conflict
   */
  @Get('leaderboard')
  @ApiOperation({
    summary: 'Get leaderboard',
    description:
      'Retrieve the top 5 completed games, ranked by fewest attempts with duration as tiebreaker.',
  })
  @ApiResponse({
    status: 200,
    description: 'Leaderboard retrieved successfully',
    schema: {
      example: [
        {
          gameId: '550e8400-e29b-41d4-a716-446655440000',
          attemptCount: 8,
          durationMs: 245000,
          completedAt: '2025-10-04T10:15:00.000Z',
        },
        {
          gameId: '6fa459ea-ee8a-3ca4-894e-db77e160355e',
          attemptCount: 9,
          durationMs: 312000,
          completedAt: '2025-10-04T09:45:00.000Z',
        },
      ],
    },
  })
  async getLeaderboard() {
    return this.gameService.getLeaderboard();
  }

  /**
   * GET /game/:gameId - Get current game state
   * Returns game status, matched cards, and attempt count
   * Does not reveal unmatched card values
   */
  @Get(':gameId')
  @ApiOperation({
    summary: 'Get game state',
    description:
      'Retrieve the current state of a game. Does not reveal unmatched card values.',
  })
  @ApiParam({
    name: 'gameId',
    description: 'The unique game identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Game state retrieved successfully',
    schema: {
      example: {
        gameId: '550e8400-e29b-41d4-a716-446655440000',
        status: 'in-progress',
        matchedCards: ['A1', 'B2', 'C3', 'D4'],
        attemptCount: 5,
        startTime: '2025-10-04T10:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Game not found',
  })
  async getGameState(@Param('gameId') gameId: string) {
    return this.gameService.getGameState(gameId);
  }

  /**
   * GET /game/:gameId/history - Get attempt history for a game
   * Returns chronological list of all attempts
   */
  @Get(':gameId/history')
  @ApiOperation({
    summary: 'Get attempt history',
    description:
      'Retrieve the complete history of all card flip attempts for a game.',
  })
  @ApiParam({
    name: 'gameId',
    description: 'The unique game identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Attempt history retrieved successfully',
    schema: {
      example: {
        gameId: '550e8400-e29b-41d4-a716-446655440000',
        attempts: [
          {
            attemptNumber: 1,
            position1: 'A1',
            position2: 'B1',
            value1: 'cat',
            value2: 'dog',
            isMatch: false,
            timestamp: '2025-10-04T10:30:15.000Z',
          },
          {
            attemptNumber: 2,
            position1: 'A1',
            position2: 'A2',
            value1: 'cat',
            value2: 'cat',
            isMatch: true,
            timestamp: '2025-10-04T10:30:28.000Z',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Game not found',
  })
  async getGameHistory(@Param('gameId') gameId: string) {
    return this.gameService.getGameHistory(gameId);
  }
}
