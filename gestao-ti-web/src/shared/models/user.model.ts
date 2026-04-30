export interface User {
    id: string;
    username: string;
    email: string;
    roleName: string;
    createdAt: string;    
}

export interface UserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
}