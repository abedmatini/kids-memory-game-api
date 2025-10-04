import { IsString, Matches, IsNotEmpty } from 'class-validator';

export class PlayRoundDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-D][1-4]$/, {
    message: 'position1 must be in format A-D and 1-4 (e.g., A1, B3, D4)',
  })
  position1: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-D][1-4]$/, {
    message: 'position2 must be in format A-D and 1-4 (e.g., A1, B3, D4)',
  })
  position2: string;
}
