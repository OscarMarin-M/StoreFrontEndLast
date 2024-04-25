import { Product } from "./product.interface";

export interface Detailorder {
  productId: string;
  quantity: number;
  product?: Product
}
