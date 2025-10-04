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
import { GameService } from './game.service';
import { PlayRoundDto } from './dto';
import { CardPosition } from './constants/game.constants';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  /**
   * POST /game/new - Start a new game
   * Returns the game ID and success message
   */
  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async createNewGame() {
    return this.gameService.createNewGame();
  }

  /**
   * POST /game/:gameId/play - Submit two cards for matching
   * Accepts game ID and 2 card positions
   * Returns match result, card values, and game completion status
   */
  @Post(':gameId/play')
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
  async getLeaderboard() {
    return this.gameService.getLeaderboard();
  }

  /**
   * GET /game/:gameId - Get current game state
   * Returns game status, matched cards, and attempt count
   * Does not reveal unmatched card values
   */
  @Get(':gameId')
  async getGameState(@Param('gameId') gameId: string) {
    return this.gameService.getGameState(gameId);
  }

  /**
   * GET /game/:gameId/history - Get attempt history for a game
   * Returns chronological list of all attempts
   */
  @Get(':gameId/history')
  async getGameHistory(@Param('gameId') gameId: string) {
    return this.gameService.getGameHistory(gameId);
  }
}
