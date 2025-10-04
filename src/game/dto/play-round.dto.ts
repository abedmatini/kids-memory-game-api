import { IsString, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayRoundDto {
  @ApiProperty({
    description: 'First card position in format [A-D][1-4]',
    example: 'A1',
    pattern: '^[A-D][1-4]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-D][1-4]$/, {
    message: 'position1 must be in format A-D and 1-4 (e.g., A1, B3, D4)',
  })
  position1: string;

  @ApiProperty({
    description: 'Second card position in format [A-D][1-4]',
    example: 'B2',
    pattern: '^[A-D][1-4]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-D][1-4]$/, {
    message: 'position2 must be in format A-D and 1-4 (e.g., A1, B3, D4)',
  })
  position2: string;
}
