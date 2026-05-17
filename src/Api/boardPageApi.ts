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

async function getUsers(){
  console.log("Fetching users...");
  const res = await api.get<User[]>("/users");
  return res.data;
}

async function addUser(user: CreateUserPayload){
  console.log("Adding new user...");
  const res =  await api.post<User>("/users", user);
  return res.data;
}

async function deleteUserById(id: number){
  console.log(`Deleting user with ID: ${id}`);
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

async function updateUserById(id:number, changes: Partial<User>){
  console.log(`Updating user with ID: ${id}`);
  const res = await api.patch<User>(`/users/${id}`, changes);
  return res.data;
}

// הוספתי פונקציות API ל-boards, columns, items
async function getBoards() {
  console.log("Fetching boards...");
  const res = await api.get<Boards[]>("/boards");
  return res.data;
}

// הוספת BOARD חדש לאתר 
async function addBoard(changes : Partial<Boards>) {
  console.log("Adding new Board");
  const res = await api.post<Boards>("/boards", changes);
  return res.data;
}

// הוספתי פונקציה ל-get של board לפי id
async function getBoardById(boardId: number) {
  console.log(`Fetching board with ID: ${boardId}`);
  const res = await api.get<Boards>(`/boards/${boardId}`);
  return res.data;
}

async function updateBoardById(boardId: number, changes: Partial<Boards>) {
  console.log(`Updating board with ID: ${boardId}`);
  const res = await api.patch<Boards>(`/boards/${boardId}`, changes);
  return res.data;
}

async function DeleteColumnById(columnId: number) {
  console.log(`Deleting column with ID: ${columnId}`);
  
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
  console.log(`Deleting board with ID: ${boardId}`);
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
async function addColumn(column: CreateColumnPayload) {
  console.log("Adding new Column...");
  const res = await api.post<Columns>("/columns", column);
  return res.data;
}

// הוספתי פונקציה ל-get של columns לפי boardId
async function getColumns(boardId: number) {
  console.log(`Fetching columns for board with ID: ${boardId}`);
  const res = await api.get<Columns[]>("/columns", {
    params: { boardId },
  });
  return res.data;
}

// הוספתי פונקציה ל-get של items לפי boardId
async function getItems(boardId: number) {
  console.log(`Fetching items for board with ID: ${boardId}`);
  const res = await api.get<Items[]>("/items", {
    params: { boardId },
  });
  return res.data;
}

// הוספתי פונקציות ל-delete, add, update של items
async function deleteItemById(id: number) {
  console.log(`Deleting item with ID: ${id}`);
  const res = await api.delete(`/items/${id}`);
  return res.data;
}

async function addItemRequest(item: CreateItemPayload) {
  console.log("Adding new item...");
  const res = await api.post<Items>("/items", item);
  return res.data;
}

async function updateItemRequest(id: number, changes: Partial<Items>) {
  console.log(`Updating item with ID: ${id}`);
  const res = await api.patch<Items>(`/items/${id}`, changes);
  return res.data;
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
