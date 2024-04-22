export interface Category {
  id:          string;
  name:        string;
  description: string;
  isDeleted:   boolean;
  createdAt:   Date;
  updatedAt:   Date;
  createdBy:   string;
  updatedBy:   string;
}
