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
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { Reference, ReferenceDocument } from './references.schema';
export declare class ReferencesService {
    private referenceModel;
    constructor(referenceModel: Model<ReferenceDocument>);
    create(createReferenceDto: CreateReferenceDto): Promise<Reference>;
    findAll(): Promise<Reference[]>;
    findOne(id: string): Promise<Reference>;
    update(id: string, updateReferenceDto: UpdateReferenceDto): Promise<Reference>;
    remove(id: string): Promise<Reference>;
    getLinkByReference(reference: string): Promise<string>;
    getActiveReferences(): Promise<Reference[]>;
    checkReferenceExists(reference: string): Promise<boolean>;
    getReferenceByReference(reference: string): Promise<Reference>;
}
