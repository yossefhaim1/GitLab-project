export type CreateBoardDto = {
  title: string; 
  isDefault?: boolean;
}
 export type UpdateBoardDto = {
  id: number;
  title?: string; 
  isDefault?: boolean;
}
