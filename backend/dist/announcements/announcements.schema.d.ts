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
import * as mongoose from 'mongoose';
export declare class Announcement {
    _id: mongoose.Schema.Types.ObjectId;
    descricao: string;
    token: string;
    CPM: number;
    anunciante: string;
    criadorConteudo: string;
    status: string;
    concluido: boolean;
    linkParametrizado: string;
    proposalId: number;
    totalAmount: number;
    advertiserWalletAddress: string;
    creatorWalletAddress: string;
    milestone: number;
}
export declare const AnnouncementSchema: mongoose.Schema<Announcement, mongoose.Model<Announcement, any, any, any, mongoose.Document<unknown, any, Announcement> & Announcement & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Announcement, mongoose.Document<unknown, {}, mongoose.FlatRecord<Announcement>> & mongoose.FlatRecord<Announcement> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}>>;
export type AnnouncementDocument = Announcement & mongoose.Document;
