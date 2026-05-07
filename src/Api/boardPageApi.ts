import api from "./Axios-Api";
import type {
  Boards,
  Items,
  Columns,
  CreateItemPayload,
  CreateColumnPayload,
  User,
  CreateUserPayload,
} from "../Type";

function getUsers(){
  return api.get<User[]>("/users");
}

function addUser(user: CreateUserPayload){
  return api.post<User>("/users", user);
}

function deleteUserById(id: number){
  return api.delete(`/users/${id}`);
}

function updateUserById(id:number, changes: Partial<User>){
  return api.patch<User>(`/users/${id}`, changes);
}

// הוספתי פונקציות API ל-boards, columns, items
function getBoards() {
  return api.get<Boards[]>("/boards");
}

// הוספת BOARD חדש לאתר 
function addBoard(changes : Partial<Boards>) {
  return api.post<Boards>("/boards", changes);
}

// הוספתי פונקציה ל-get של board לפי id
function getBoardById(boardId: number) {
  return api.get<Boards>(`/boards/${boardId}`);
}

function updateBoardById(boardId: number, changes: Partial<Boards>) {
  return api.patch<Boards>(`/boards/${boardId}`, changes);
}

async function DeleteColumnById(columnId: number) {
  // מביא את כל האייטמים של העמודה
  const res = await api.get("/items", {
    params: { columnId },
  });

  const items = res.data;

  // מוחק את כל האייטמים
  await Promise.all(items.map((item: any) => api.delete(`/items/${item.id}`)));
  // מוחק את הקולום
  await api.delete(`/columns/${columnId}`);
}

async function deleteBoardById(boardId: number) {
  const resItems = await api.get("/items", {
    params: { boardId },
  });

  const items = resItems.data;

  await Promise.all(
    items.map(async (item: any) => {
      try {
        await api.delete(`/items/${item.id}`);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          throw error;
        }
      }
    })
  );

  const resColumns = await api.get("/columns", {
    params: { boardId },
  });

  const columns = resColumns.data;

  await Promise.all(
    columns.map(async (column: any) => {
      try {
        await api.delete(`/columns/${column.id}`);
      } catch (error: any) {
        if (error.response?.status !== 404) {
          throw error;
        }
      }
    })
  );

  await api.delete(`/boards/${boardId}`);
}

// הוספת עמודה חדשה לאתר
function addColumn(column: CreateColumnPayload) {
  return api.post<Columns>("/columns", column);
}

// הוספתי פונקציה ל-get של columns לפי boardId
function getColumns(boardId: number) {
  return api.get<Columns[]>("/columns", {
    params: { boardId },
  });
}

// הוספתי פונקציה ל-get של items לפי boardId
function getItems(boardId: number) {
  return api.get<Items[]>("/items", {
    params: { boardId },
  });
}

// הוספתי פונקציות ל-delete, add, update של items
function deleteItemById(id: number) {
  return api.delete(`/items/${id}`);
}

function addItemRequest(item: CreateItemPayload) {
  return api.post<Items>("/items", item);
}

function updateItemRequest(id: number, changes: Partial<Items>) {
  return api.patch<Items>(`/items/${id}`, changes);
}

export const API = {
  getUsers,
  addUser,
  deleteUserById,
  updateUserById,

  addBoard,
  getBoardById,
  getBoards,
  deleteBoardById,
  updateBoardById,


  addColumn,
  getColumns,
  DeleteColumnById,

  getItems,
  deleteItemById,
  addItemRequest,
  updateItemRequest,
};
