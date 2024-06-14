export interface LoginUserResponse {
    user:    User;
    token:   string;
    message: string;
}

export interface User {
    _id:          string;
    first_name:   string;
    last_name:    string;
    phone_number: string;
    birth_date:   Date;
    username:     string;
    email:        string;
}
