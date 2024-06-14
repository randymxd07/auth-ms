import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {

    @Prop({ type: String, required: true })
    first_name: string;

    @Prop({ type: String, required: true })
    last_name: string;

    @Prop({ type: String, required: true, unique: true })
    phone_number: string;

    @Prop({ type: String, required: true })
    birth_date: string;

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: Boolean, required: false, default: true })
    status: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toObject', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password; 
        delete ret.status;
        return ret;
    }
});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.__v;
        delete ret.password;
        delete ret.status;
        return ret;
    }
});