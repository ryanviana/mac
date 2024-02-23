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
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare class Reference {
    _id: mongoose.Schema.Types.ObjectId;
    announcementId: string;
    link: string;
    reference: string;
    active: boolean;
}
export declare const ReferenceSchema: mongoose.Schema<Reference, mongoose.Model<Reference, any, any, any, Document<unknown, any, Reference> & Reference & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Reference, Document<unknown, {}, mongoose.FlatRecord<Reference>> & mongoose.FlatRecord<Reference> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type ReferenceDocument = Reference & Document;
