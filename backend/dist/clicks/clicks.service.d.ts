/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateLinkDto as CreateClickDto } from './dto/create-click.dto';
import { UpdateLinkDto as UpdateClickDto } from './dto/update-click.dto';
import { Click, ClickDocument } from './clicks.schema';
import { UnpaidClicksResponseDto } from './dto/count-click.dto';
import { ClickCountDto } from './dto/count-click-proposal-dto';
export declare class ClicksService {
    private clickModel;
    constructor(clickModel: Model<ClickDocument>);
    create(createClickDto: CreateClickDto): Promise<Click>;
    findAll(): Promise<Click[]>;
    findOne(id: string): Promise<Click>;
    update(id: string, updateClickDto: UpdateClickDto): Promise<Click>;
    remove(id: string): Promise<Click>;
    hasAtLeastThousandUnpaidClicks(reference: string): Promise<UnpaidClicksResponseDto>;
    markAllClicksAsPaid(): Promise<{
        updatedCount: number;
    }>;
    checkIfIpAlreadyClicked(ip: string, reference: string): Promise<boolean>;
    countClicksByProposalId(proposalId: number): Promise<ClickCountDto>;
}
