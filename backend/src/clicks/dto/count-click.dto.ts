import { ApiProperty } from '@nestjs/swagger';

export class UnpaidClicksResponseDto {
  @ApiProperty({
    description: 'Indicates if there are at least a thousand unpaid clicks',
    example: true,
  })
  hasAtLeastThousandUnpaidClicks: boolean;

  @ApiProperty({
    description: 'The count of unpaid clicks',
    example: 1020,
    required: false,
  })
  unpaidClicksCount?: number;

  @ApiProperty({
    description: 'Additional message, if any',
    example: 'Threshold of 1000 unpaid clicks exceeded',
    required: false,
  })
  message?: string;
}
