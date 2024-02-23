import { ApiProperty } from '@nestjs/swagger';

export class CheckLinkByReferenceDto {
  @ApiProperty({
    description: 'The reference to check the link for',
    example: '/test',
  })
  reference: string;
}
