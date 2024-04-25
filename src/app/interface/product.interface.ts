import { Category } from "./category.interface";

export interface Product {
  id:          string;
  name:        string;
  description: string;
  stock:       number;
  price:       number;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
  createdBy:   string;
  updatedBy:   string;
  category:  Category
}
