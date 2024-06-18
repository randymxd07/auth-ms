import { Types } from "mongoose";

export interface ChangePasswordResponse {
    data:    ChangePasswordData;
    message: string;
}

export interface ChangePasswordData {
    _id:          Types.ObjectId;
    first_name:   string;
    last_name:    string;
    phone_number: string;
    birth_date:   string;
    username:     string;
    email:        string;
}
