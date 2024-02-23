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
export declare class Creator {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    biography: string;
    occupation: string;
    targetAudience: string;
    stars: number;
    link: string;
    email: string;
    CPM: number;
    walletAddress: string;
    paymentToken: string;
}
export declare const CreatorSchema: mongoose.Schema<Creator, mongoose.Model<Creator, any, any, any, Document<unknown, any, Creator> & Creator & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Creator, Document<unknown, {}, mongoose.FlatRecord<Creator>> & mongoose.FlatRecord<Creator> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type CreatorDocument = Creator & Document;
