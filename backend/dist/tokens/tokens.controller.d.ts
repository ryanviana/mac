import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './tokens.schema';
export declare class TokensController {
    private readonly tokenService;
    constructor(tokenService: TokensService);
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    findAll(): Promise<Token[]>;
    findOne(id: string): Promise<Token>;
    update(id: string, updateTokenDto: UpdateTokenDto): Promise<Token>;
    remove(id: string): Promise<Token>;
}
