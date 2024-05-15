export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: number;
    address: string;
    country?: string;
    city?: string;
    isAdmin?: boolean;
}
