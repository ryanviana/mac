import { CreatorsService } from './creators.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { Creator } from './creators.schema';
export declare class CreatorsController {
    private readonly creatorsService;
    constructor(creatorsService: CreatorsService);
    create(createCreatorDto: CreateCreatorDto): Promise<Creator>;
    findAll(): Promise<Creator[]>;
    findOne(id: string): Promise<Creator>;
    update(id: string, updateCreatorDto: UpdateCreatorDto): Promise<Creator>;
    remove(id: string): Promise<Creator>;
}
