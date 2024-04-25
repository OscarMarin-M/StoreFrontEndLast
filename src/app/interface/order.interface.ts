import { Detailorder } from "./detailorder.interface";
import { Store } from "./store.interface";

export interface Order {
  id:              string;
  name:            string;
  date:            Date;
  shippingAddress: string;
  delivery:        boolean;
  isDeleted:       boolean;
  store: Store
  detailsOrders: Detailorder[];
}
