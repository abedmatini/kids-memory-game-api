import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttemptDocument = Attempt & Document;

@Schema({ timestamps: true })
export class Attempt {
  @Prop({ required: true, index: true })
  gameId: string; // Reference to Game _id

  @Prop({ required: true })
  attemptNumber: number;

  @Prop({ required: true, type: [String] })
  positions: [string, string]; // Two card positions like ["B1", "C3"]

  @Prop({ required: true, type: [String] })
  values: [string, string]; // Two card values like ["cat", "dog"]

  @Prop({ required: true })
  isMatch: boolean;

  @Prop({ required: true, type: Date })
  timestamp: Date;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);

// Create indexes for better query performance
AttemptSchema.index({ gameId: 1, attemptNumber: 1 });
AttemptSchema.index({ timestamp: 1 });
