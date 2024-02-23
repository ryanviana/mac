// create-click.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CountClickRequestDto {
  @ApiProperty({
    description: 'Reference identifier for the click count request',
    example: '/test',
  })
  reference: string;
}
