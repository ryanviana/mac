import { ClicksService } from './clicks.service';
import { CreateLinkDto as CreateClickDto } from './dto/create-click.dto';
import { UpdateLinkDto as UpdateClickDto } from './dto/update-click.dto';
import { CountClickRequestDto } from './dto/count-click-request-dto';
import { CheckIpAlreadyClicked } from './dto/check-click-already-clicked-dto';
import { Click } from './clicks.schema';
export declare class ClicksController {
    private readonly clicksService;
    constructor(clicksService: ClicksService);
    findAll(): Promise<Click[]>;
    findOne(id: string): Promise<Click>;
    create(createClickDto: CreateClickDto): Promise<Click>;
    ipAlreadyClicked(checkIpAlreadyClicked: CheckIpAlreadyClicked): Promise<boolean>;
    hasAtLeastThousandUnpaidClicks(countClickRequestDto: CountClickRequestDto): Promise<import("./dto/count-click.dto").UnpaidClicksResponseDto>;
    markAllClicksAsPaid(): Promise<{
        updatedCount: number;
    }>;
    update(id: string, updateClickDto: UpdateClickDto): Promise<Click>;
    remove(id: string): Promise<Click>;
    countClicks(proposalId: number): Promise<import("./dto/count-click-proposal-dto").ClickCountDto>;
}
