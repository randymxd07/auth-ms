import { Types } from "mongoose";

export interface RegisterUserResponse {
    data: Data;
    token: string;
}

export interface Data {
    first_name: string;
    last_name: string;
    phone_number: string;
    birth_date: string;
    username: string;
    email: string;
    _id: Types.ObjectId;
}
