import  api  from "./Axios-Api" 
import type { Boards, Items, Columns , Statuses} from "../Type";

// הוספתי פונקציות API ל-boards, columns, items
function getBoards() {
  return api.get<Boards[]>("/boards");
}

// הוספתי פונקציה ל-get של columns לפי boardId
function getColumns(boardId: string) {
  return api.get<Columns[]>("/columns", {
    params: { boardId },
  });
}

// הוספתי פונקציה ל-get של items לפי boardId
function getItems(boardId: string) {
  return api.get<Items[]>("/items", {
    params: { boardId },
  });
}

// הוספתי פונקציות ל-delete, add, update של items
function deleteItemById(id: string) {
  return api.delete(`/items/${id}`);
}

function addItemRequest(item: Items) {
  return api.post<Items>("/items", item);
}

function updateItemRequest(id: string, changes: Partial<Items>) {
  return api.patch<Items>(`/items/${id}`, changes);
}

function getStatuses() {
  return api.get<Statuses[]>("/statuses");
}
function addStatus(status: Statuses) {
  return api.post("/statuses", { status });
}

export const API = {
  getBoards,
  getColumns,
  getItems,
  getStatuses,
  deleteItemById,
  addItemRequest,
  updateItemRequest,
  addStatus,
};