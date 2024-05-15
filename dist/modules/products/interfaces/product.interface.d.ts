export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imgUrl: string;
}
export interface IProductUpdate {
    description?: string;
    price?: number;
    stock?: number;
    imgUrl?: string;
}
