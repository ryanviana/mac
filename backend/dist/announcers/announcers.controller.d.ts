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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AnnouncersService } from './announcers.service';
import { CreateAnnouncerDto } from './dto/create-announcer.dto';
import { UpdateAnnouncerDto } from './dto/update-announcer.dto';
import { Announcer } from './announcers.schema';
export declare class AnnouncersController {
    private readonly announcersService;
    constructor(announcersService: AnnouncersService);
    create(createAnnouncerDto: CreateAnnouncerDto): Promise<import("mongoose").Document<unknown, {}, import("./announcers.schema").AnnouncerDocument> & Announcer & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./announcers.schema").AnnouncerDocument> & Announcer & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./announcers.schema").AnnouncerDocument> & Announcer & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateAnnouncerDto: UpdateAnnouncerDto): Promise<Announcer>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./announcers.schema").AnnouncerDocument> & Announcer & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
