// create-click.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CheckIpAlreadyClicked {
  @ApiProperty({
    description: 'IP address of the user',
    example: '192.168.1.1',
  })
  ip: string;

  @ApiProperty({
    description: 'Reference identifier to check against the IP',
    example: '/test',
  })
  reference: string;
}
