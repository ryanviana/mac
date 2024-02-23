import { ReferencesService } from './references.service';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { CheckLinkByReferenceDto } from './dto/check-link-by-reference.dto';
import { Reference } from './references.schema';
export declare class ReferencesController {
    private readonly referenceService;
    constructor(referenceService: ReferencesService);
    create(createReferenceDto: CreateReferenceDto): Promise<Reference>;
    findAll(): Promise<Reference[]>;
    getLinkByReference(checkLinkByReferenceDto: CheckLinkByReferenceDto): Promise<string>;
    findOne(id: string): Promise<Reference>;
    update(id: string, updateReferenceDto: UpdateReferenceDto): Promise<Reference>;
    remove(id: string): Promise<Reference>;
    getActiveReferences(): Promise<Reference[]>;
    checkReferenceExists(reference: string): Promise<boolean>;
    getIdByReference(reference: string): Promise<Reference>;
}
