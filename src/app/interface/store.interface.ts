export interface Store {
  id:           string;
  name:         string;
  address:      string;
  city:         string;
  openingHours: string;
  isDeleted:    boolean;
  createdAt:    Date;
  updatedAt:    Date;
  createdBy:    string;
  updatedBy:    string;
}
