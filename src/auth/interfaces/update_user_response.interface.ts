export interface UpdateUserResponse {
    data:    UpdateUserResponseData;
    message: string;
}

export interface UpdateUserResponseData {
    first_name:   string;
    last_name:    string;
    email:        string;
    phone_number: string;
    birth_date:   string;
    username:     string;
    id:           string;
}
