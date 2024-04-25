import { Product } from "./product.interface";
import { Store } from "./store.interface";

export interface OrderWithProducts {
    id: string;
    name: string;
    shippingAddress: string;
    delivery: boolean;
    storeName: String;
    products: Product[];
}