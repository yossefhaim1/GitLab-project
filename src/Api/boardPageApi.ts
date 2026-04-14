import  api  from "./Axios-Api" 
import type { Boards, Items, Columns , Statuses} from "../Type";

// הוספתי פונקציות API ל-boards, columns, items
function getBoards() {
  return api.get<Boards[]>("/boards");
}

// הוספת BOARD חדש לאתר 
function addBoard(board: Boards) {
  return api.post<Boards>("/boards", board);

}

// הוספתי פונקציה ל-get של board לפי id
function getBoardById(boardId: string) {
  return api.get<Boards>(`/boards/${boardId}`);
}

// הוספת עמודה חדשה לאתר 
function addColumn(column: Columns) {
  return api.post<Columns>("/columns", column);
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
  addBoard,
  addColumn,
  getBoardById,
  getBoards,
  getColumns,
  getItems,
  getStatuses,
  deleteItemById,
  addItemRequest,
  updateItemRequest,
  addStatus,
};