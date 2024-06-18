export interface VerifyUserResponse {
    user:  User;
    token: string;
    message: string;
}

interface User {
    id:       string;
    email:    string;
    username: string;
}
