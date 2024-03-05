import { CounterService } from './counter.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
export declare class CounterController {
    private readonly counterService;
    constructor(counterService: CounterService);
    create(createCounterDto: CreateCounterDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCounterDto: UpdateCounterDto): Promise<any>;
}
