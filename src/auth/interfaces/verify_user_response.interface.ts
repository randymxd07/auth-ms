export interface VerifyUserResponse {
    user:  User;
    token: string;
}

export interface User {
    id:       string;
    email:    string;
    username: string;
}
