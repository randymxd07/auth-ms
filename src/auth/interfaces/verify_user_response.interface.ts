export interface VerifyUserResponse {
    user:  User;
    token: string;
}

interface User {
    id:       string;
    email:    string;
    username: string;
}
