import api from "./Axios-Api";
import type {
  Boards,
  Items,
  Columns,
  CreateItemPayload,
  CreateColumnPayload,
  User,
  CreateUserPayload,
} from  "../Type";

async function getUsers() {
  console.log("");
  console.log("Fetching users...");
  const res = await api.get<User[]>("/users");
  return res.data;
}

async function addUser(user: CreateUserPayload) {
  console.log("");
  console.log("Adding new user...");
  const res = await api.post<User>("/users", user);
  return res.data;
}

async function deleteUserById(id: number) {
  console.log("");
  console.log(`Deleting user with ID: ${id}`);
  const res = await api.delete(`/users/${id}`);
  return res.data;
}

async function updateUserById(id: number, changes: Partial<User>) {
  console.log("");
  console.log(`Updating user with ID: ${id}`);
  const res = await api.patch<User>(`/users/${id}`, changes);
  return res.data;
}

// הוספתי פונקציות API ל-boards, columns, items
async function getBoards() {
  console.log("");
  console.log("Fetching boards...");
  const res = await api.get<Boards[]>("/boards");
  return res.data;
}

// הוספת BOARD חדש לאתר
async function addBoard(changes: Partial<Boards>) {
  console.log("");
  console.log("Adding new Board");
  const res = await api.post<Boards>("/boards", changes);
  return res.data;
}

// הוספתי פונקציה ל-get של board לפי id
async function getBoardById(boardId: number) {
  console.log("");
  console.log(`Fetching board with ID: ${boardId}`);
  const res = await api.get<Boards>(`/boards/${boardId}`);
  return res.data;
}

async function updateBoardById(newDefaultBoard: number) {
  console.log("");
  console.log(`Updating board with ID: ${newDefaultBoard}`);
  const { data: boards } = await api.get<Boards[]>("/boards");
  console.log("Success to fetch all Board");
  
  await Promise.all(
    boards.map((board) => {
      console.log(`Updating board with ID: ${board.id} - setting isDefault to ${board.id === newDefaultBoard}`);
      return api.patch(`/boards/${board.id}`, {
        isDefault: board.id === newDefaultBoard,
      });
    })
  );

  return newDefaultBoard;
}

async function DeleteColumnById(columnId: number) {
  console.log("");
  console.log(`Deleting column with ID: ${columnId}`);

  // מביא את כל האייטמים של העמודה
  const res = await api.get<Items[]>("/items", {
    params: { columnId },
  });
  console.log("Success to fetch all Items");

  const items = res.data;

  // מוחק את כל האייטמים
  await Promise.all(
    items.map((item: Items) => api.delete(`/items/${item.id}`)),
  );
  console.log("Success to Delete all Items");
  // מוחק את הקולום
  await api.delete(`/columns/${columnId}`);
  console.log(`Deleted column with ID: ${columnId}`);
}

async function deleteBoardById(boardId: number) {
  console.log("");
  console.log(`Starting deletion of board with ID: ${boardId}`);

  const resBoards = await api.get<Boards[]>("/boards");
  console.log("Success to fetch boards");
  const boards = resBoards.data;

  const boardToDelete = boards.find((b) => b.id === boardId);
  const wasDefault = boardToDelete?.isDefault === true;
  const nextDefaultBoard = boards.find((b) => b.id !== boardId);

  const resItems = await api.get<Items[]>("/items", { params: { boardId } });
  console.log("Success to fetch items");
  const items = resItems.data;

  for (const item of items) {
    try {
      await api.delete(`/items/${item.id}`);
      console.log(
        `Deleted item with ID: ${item.id} from board with ID: ${boardId}`,
      );
    } catch (error: any) {
      if (error.response?.status !== 404) throw error;
    }
  }

  const resColumns = await api.get<Columns[]>("/columns", {
    params: { boardId },
  });
  const columns = resColumns.data;
  console.log("Success to fetch columns");

  for (const column of columns) {
    try {
      await api.delete(`/columns/${column.id}`);
      console.log(
        `Deleted column with ID: ${column.id} from board with ID: ${boardId}`,
      );
    } catch (error: any) {
      if (error.response?.status !== 404) throw error;
    }
  }

  await api.delete(`/boards/${boardId}`);
  console.log(`Deleted board with ID: ${boardId}`);

  if (wasDefault && nextDefaultBoard) {
    await api.patch(`/boards/${nextDefaultBoard.id}`, {
      isDefault: true,
    });
    console.log(`Set board with ID: ${nextDefaultBoard.id} as default`);
  }

  return boardId;
}

// הוספת עמודה חדשה לאתר
async function addColumn(column: CreateColumnPayload) {
  console.log("");
  console.log("Adding new Column...");
  const res = await api.post<Columns>("/columns", column);
  return res.data;
}

// הוספתי פונקציה ל-get של columns לפי boardId
async function getColumns(boardId: number) {
  console.log("");
  console.log(`Fetching columns for board with ID: ${boardId}`);
  const res = await api.get<Columns[]>("/columns", {
    params: { boardId },
  });
  return res.data;
}

// הוספתי פונקציה ל-get של items לפי boardId
async function getItems(boardId: number) {
  console.log("");
  console.log(`Fetching items for board with ID: ${boardId}`);
  const res = await api.get<Items[]>("/items", {
    params: { boardId },
  });
  return res.data;
}

// הוספתי פונקציות ל-delete, add, update של items
async function deleteItemById(id: number) {
  console.log("");
  console.log(`Deleting item with ID: ${id}`);
  const res = await api.delete(`/items/${id}`);
  console.log(`Successfully deleted item with ID: ${id}`);
  return res.data;
}

async function addItemRequest(item: CreateItemPayload) {
  console.log("");
  console.log("Adding new item...");
  const res = await api.post<Items>("/items", item);
  return res.data;
}

async function updateItemRequest(id: number, changes: Partial<Items>) {
  console.log("");
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
