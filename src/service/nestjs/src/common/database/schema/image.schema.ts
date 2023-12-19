import { Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const schemaOptions: SchemaOptions = {
	timestamps: true,
	collection: 'images',
};

@Schema(schemaOptions)
export class Image {}

export const ImageSchema = SchemaFactory.createForClass(Image);

export type ImageDocument = Image & Document;
