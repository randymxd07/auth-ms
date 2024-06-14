import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {

    @Prop({ type: String, required: true })
    first_name: string;
    
    @Prop({ type: String, required: true })
    last_name: string;
    
    @Prop({ type: String, required: true })
    phone_number: string;
    
    @Prop({ type: String, required: true })
    birth_date: string;

    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: Boolean, required: false, default: true })
    status: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);