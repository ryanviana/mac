import { ApiProperty } from '@nestjs/swagger';

export class ClickCountDto {
  @ApiProperty({
    description: 'Indicates the number of clicks',
    example: 100,
  })
  clicks: number;

  @ApiProperty({
    description: 'Blockchain proposal ID',
    example: 1,
    required: true,
  })
  proposalId: number;
}
