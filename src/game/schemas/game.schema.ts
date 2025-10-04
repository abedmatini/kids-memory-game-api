import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

export enum GameStatus {
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true, unique: true })
  _id: string; // UUID - game session key

  @Prop({ required: true, type: [[String]] })
  board: string[][]; // 4x4 grid of animal names

  @Prop({ required: true, type: [String], default: [] })
  matchedCards: string[]; // Array of matched positions like ["A1", "B3"]

  @Prop({ required: true, enum: GameStatus, default: GameStatus.IN_PROGRESS })
  status: GameStatus;

  @Prop({ required: true, type: Date })
  startTime: Date;

  @Prop({ type: Date, default: null })
  endTime: Date | null;

  @Prop({ required: true, type: Number, default: 0 })
  attemptCount: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);

// Create indexes for better query performance
GameSchema.index({ status: 1 });
GameSchema.index({ attemptCount: 1, endTime: 1 }); // For leaderboard queries

