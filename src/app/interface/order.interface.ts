import { Store } from "./store.interface";

export interface Order {
  id:              string;
  name:            string;
  date:            Date;
  shippingAddress: string;
  delivery:        boolean;
  isDeleted:       boolean;
  createdAt:       Date;
  updatedAt:       Date;
  createdBy:       string;
  updatedBy:       string;
  store: string
}
