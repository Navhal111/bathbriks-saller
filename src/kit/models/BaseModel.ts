export default interface BaseModel {
  // _id: string;
  id?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface MetaModel {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

