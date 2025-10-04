import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Game, GameDocument, GameStatus } from './schemas/game.schema';
import { Attempt, AttemptDocument } from './schemas/attempt.schema';
import { createShuffledBoard } from './utils/card-shuffle.util';
import {
  CardPosition,
  positionToIndices,
  isValidPosition,
} from './constants/game.constants';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
  ) {}

  /**
   * Creates a new game with a shuffled board
   * Returns the game ID (session key)
   */
  async createNewGame(): Promise<{ gameId: string; message: string }> {
    const gameId = uuidv4();
    const board = createShuffledBoard();

    const newGame = new this.gameModel({
      _id: gameId,
      board,
      matchedCards: [],
      status: GameStatus.IN_PROGRESS,
      startTime: new Date(),
      endTime: null,
      attemptCount: 0,
    });

    await newGame.save();

    return {
      gameId,
      message: 'New game created successfully',
    };
  }

  /**
   * Retrieves a game by its ID
   */
  async getGameById(gameId: string): Promise<GameDocument | null> {
    return this.gameModel.findById(gameId).exec();
  }

  /**
   * Gets the current game state (without revealing unmatched cards)
   */
  async getGameState(gameId: string) {
    const game = await this.getGameById(gameId);

    if (!game) {
      throw new NotFoundException(`Game with ID '${gameId}' not found`);
    }

    return {
      gameId: game._id,
      status: game.status,
      matchedCards: game.matchedCards,
      attemptCount: game.attemptCount,
      startTime: game.startTime,
      endTime: game.endTime,
    };
  }

  /**
   * Gets the card value at a specific position
   */
  private getCardAtPosition(board: string[][], position: CardPosition): string {
    const { row, col } = positionToIndices(position);
    return board[row][col];
  }

  /**
   * Validates if a position is already matched
   */
  private isPositionMatched(
    matchedCards: string[],
    position: CardPosition,
  ): boolean {
    return matchedCards.includes(position);
  }

  /**
   * Play a round by submitting two card positions
   */
  async playRound(
    gameId: string,
    position1: CardPosition,
    position2: CardPosition,
  ): Promise<{
    isMatch: boolean;
    card1: { position: CardPosition; value: string };
    card2: { position: CardPosition; value: string };
    gameCompleted: boolean;
    attemptNumber: number;
  }> {
    // Validate positions
    if (!isValidPosition(position1) || !isValidPosition(position2)) {
      throw new BadRequestException(
        'Invalid card position format. Must be A-D and 1-4 (e.g., A1, B3, D4)',
      );
    }

    if (position1 === position2) {
      throw new BadRequestException('Cannot select the same card twice');
    }

    // Get game
    const game = await this.getGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID '${gameId}' not found`);
    }

    if (game.status === GameStatus.COMPLETED) {
      throw new BadRequestException('Game is already completed');
    }

    // Check if cards are already matched
    if (
      this.isPositionMatched(game.matchedCards, position1) ||
      this.isPositionMatched(game.matchedCards, position2)
    ) {
      throw new BadRequestException('One or both cards are already matched');
    }

    // Get card values
    const card1Value = this.getCardAtPosition(game.board, position1);
    const card2Value = this.getCardAtPosition(game.board, position2);

    // Check if match
    const isMatch = card1Value === card2Value;

    // Update attempt count
    game.attemptCount += 1;
    const attemptNumber = game.attemptCount;

    // If match, add to matched cards
    if (isMatch) {
      game.matchedCards.push(position1, position2);
    }

    // Check if game is complete (all 16 cards matched = 8 pairs)
    const gameCompleted = game.matchedCards.length === 16;
    if (gameCompleted) {
      game.status = GameStatus.COMPLETED;
      game.endTime = new Date();
    }

    // Save game state
    await game.save();

    // Save attempt history
    const attempt = new this.attemptModel({
      gameId,
      attemptNumber,
      positions: [position1, position2],
      values: [card1Value, card2Value],
      isMatch,
      timestamp: new Date(),
    });
    await attempt.save();

    return {
      isMatch,
      card1: { position: position1, value: card1Value },
      card2: { position: position2, value: card2Value },
      gameCompleted,
      attemptNumber,
    };
  }

  /**
   * Gets the attempt history for a game
   */
  async getGameHistory(gameId: string) {
    const game = await this.getGameById(gameId);
    if (!game) {
      throw new NotFoundException(`Game with ID '${gameId}' not found`);
    }

    const attempts = await this.attemptModel
      .find({ gameId })
      .sort({ attemptNumber: 1 })
      .exec();

    return {
      gameId,
      attempts: attempts.map((attempt) => ({
        attemptNumber: attempt.attemptNumber,
        positions: attempt.positions,
        values: attempt.values,
        isMatch: attempt.isMatch,
        timestamp: attempt.timestamp,
      })),
    };
  }

  /**
   * Gets the leaderboard - top 5 games with fewest attempts
   * Tiebreaker: quickest time (shortest duration)
   */
  async getLeaderboard() {
    const completedGames = await this.gameModel
      .find({ status: GameStatus.COMPLETED })
      .sort({ attemptCount: 1, endTime: 1 }) // Sort by attempts ascending, then by end time
      .limit(5)
      .exec();

    return completedGames.map((game) => {
      const duration = game.endTime
        ? game.endTime.getTime() - game.startTime.getTime()
        : 0;

      return {
        gameId: game._id,
        attemptCount: game.attemptCount,
        startTime: game.startTime,
        endTime: game.endTime,
        durationMs: duration,
      };
    });
  }
}
