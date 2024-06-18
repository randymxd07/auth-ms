import { Types } from "mongoose";

export interface ChangePasswordResponse {
    data:    Data;
    message: string;
}

export interface Data {
    _id:          Types.ObjectId;
    first_name:   string;
    last_name:    string;
    phone_number: string;
    birth_date:   string;
    username:     string;
    email:        string;
}
