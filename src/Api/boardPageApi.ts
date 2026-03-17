import  api  from "./Axios"; 
import type { Boards, Items, Columns } from "../Type";

// הוספתי פונקציות API ל-boards, columns, items
export function getBoards() {
  return api.get<Boards[]>("/boards");
}

// הוספתי פונקציה ל-get של columns לפי boardId
export function getColumns(boardId: string) {
  return api.get<Columns[]>("/columns", {
    params: { boardId },
  });
}

// הוספתי פונקציה ל-get של items לפי boardId
export function getItems(boardId: string) {
  return api.get<Items[]>("/items", {
    params: { boardId },
  });
}

// הוספתי פונקציות ל-delete, add, update של items
export function deleteItemById(id: string) {
  return api.delete(`/items/${id}`);
}

export function addItemRequest(item: Items) {
  return api.post<Items>("/items", item);
}

export function updateItemRequest(id: string, changes: Partial<Items>) {
  return api.patch<Items>(`/items/${id}`, changes);
}