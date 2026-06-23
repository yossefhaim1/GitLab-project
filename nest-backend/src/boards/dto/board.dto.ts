export type CreateBoardDto = {
  title: string; 
  isDefault?: boolean;
}
 export type UpdateBoardDto = {
  title?: string; 
  isDefault?: boolean;
}
