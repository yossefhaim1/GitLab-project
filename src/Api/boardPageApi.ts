import api from "./Axios-Api";

import type {
  Boards,
  Items,
  Columns,
  CreateItemPayload,
  CreateColumnPayload,
  Assignee,
  CreateAssigneePayload,
  Tag,
  CreateTagPayload,
  Priority,
  CreatePriorityPayload,
  CreateItemTagPayload,
  ItemTag,
} from "../Type";

// ASSIGNEES

async function getAssignees() {
  const res = await api.get<Assignee[]>("/assignees");
  return res.data;
}

async function getAssigneeById(id: number) {
  const res = await api.get<Assignee>(`/assignees/${id}`);
  return res.data;
}

async function getAssigneeByName(name: string) {
  const res = await api.get<Assignee>(`/assignees/name/${name}`);
  return res.data;
}

async function addAssignee(assigneeData: CreateAssigneePayload) {
  const res = await api.post<Assignee>("/assignees", assigneeData);
  return res.data;
}

async function deleteAssigneeById(id: number) {
  const res = await api.delete(`/assignees/${id}`);
  return res.data;
}

async function updateAssigneeById(id: number, changes: Partial<Assignee>) {
  const res = await api.patch<Assignee>(`/assignees/${id}`, changes);
  return res.data;
}

// BOARDS

async function getBoards() {
  const res = await api.get<{ boards: Boards[] }>("/boards");
  return res.data;    
}

async function getBoardById(boardId: number) {
  const res = await api.get<Boards>(`/boards/${boardId}`);
  return res.data;
}

async function getAllParamsForBoard(boardId: number) {
  const res = await api.get<Boards>(`/boards/${boardId}/params`);
  return res.data;
}

async function addBoard(boardData: Partial<Boards>) {
  const res = await api.post<Boards>("/boards", boardData);
  return res.data;
}

async function updateBoardById(boardId: number, changes: Partial<Boards>) {
  const res = await api.patch<Boards>(`/boards/${boardId}`, changes);
  return res.data;
}

async function setDefaultBoard(boardId: number) {
  const res = await api.patch<Boards>(`/boards/${boardId}/default`);
  return res.data;
}

async function deleteBoardById(boardId: number) {
  const res = await api.delete(`/boards/${boardId}`);
  return res.data;
}

// COLUMNS

async function getColumns() {
  const res = await api.get<{ columns: Columns[] }>("/columns");
  return res.data;
}

async function getColumnById(columnId: number) {
  const res = await api.get<Columns>(`/columns/${columnId}`);
  return res.data;
}
async function getColumnsByBoardId(boardId: number) {
  const res = await api.get<{ columns: Columns[] }>(`/columns/board/${boardId}`);
  return res.data;
}

async function addColumn(columnData: CreateColumnPayload) {
  const res = await api.post<Columns>("/columns", columnData);
  return res.data;
}

async function updateColumnById(columnId: number, changes: Partial<Columns>) {
  const res = await api.patch<Columns>(`/columns/${columnId}`, changes);
  return res.data;
}

async function deleteColumnById(columnId: number) {
  const res = await api.delete(`/columns/${columnId}`);
  return res.data;
}

// ITEMS

async function getItems() {
  const res = await api.get<Items[]>("/items");
  return res.data;
}

async function getItemById(id: number) {
  const res = await api.get<Items>(`/items/${id}`);
  return res.data;
}

async function getItemRelations(id: number) {
  const res = await api.get<Items>(`/items/${id}/relations`);
  return res.data;
}

async function getItemsByBoardId(boardId: number) {
  const res = await api.get<Items[]>(`/items/board/${boardId}`);
  return res.data;
}

async function getItemsByColumnId(columnId: number) {
  const res = await api.get<Items[]>(`/items/column/${columnId}`);
  return res.data;
}

async function addItemRequest(itemData: CreateItemPayload) {
  const res = await api.post<Items>("/items", itemData);
  return res.data;
}

async function updateItemRequest(id: number, changes: Partial<Items>) {
  const res = await api.patch<Items>(`/items/${id}`, changes);
  return res.data;
}

async function deleteItemById(id: number) {
  const res = await api.delete(`/items/${id}`);
  return res.data;
}

// Tag

async function getTags() {
  const res = await api.get<Tag[]>("/tags");
  return res.data;
}

async function createTag(tagData: CreateTagPayload) {
  const res = await api.post<Tag>("/tags", tagData);
  return res.data;
}

async function deleteTagById(id: number) {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
}

async function updateTagById(id: number, changes: Partial<Tag>) {
  const res = await api.patch<Tag>(`/tags/${id}`, changes);
  return res.data;
}

// itemTags

async function addItemTag(itemTagData: CreateItemTagPayload) {
  const res = await api.post<ItemTag>("/itemTags", itemTagData);
  return res.data;
}

async function getItemTagRelationsByItemId(
  itemId: number
): Promise<ItemTag[]> {
  const res = await api.get<ItemTag[]>(
    `/itemTags/item/${itemId}/relations`
  );

  return res.data;
}

async function deleteItemTagById(id: number) {
  const res = await api.delete(`/itemTags/${id}`);
  return res.data;
}

async function getTagsByItemId(itemId: number) {
  const res = await api.get<Tag[]>(`/itemTags/item/${itemId}`);
  return res.data;
}

//  priority

async function getPriorities() {
  const res = await api.get(`/priorities`);
  return res.data;
}

async function addPriority(priorityData: CreatePriorityPayload) {
  const res = await api.post("/priorities", priorityData);
  return res.data;
}
async function updatePriorityById(id: number, changes: Partial<Priority>) {
  const res = await api.patch<Priority>(`/priorities/${id}`, changes);
  return res.data;
}
async function deletePriorityById(id: number) {
  const res = await api.delete<Priority>(`/priorities/${id}`);
  return res.data;
}

export const API = {
  // assignees
  getAssignees,
  getAssigneeById,
  getAssigneeByName,
  addAssignee,
  deleteAssigneeById,
  updateAssigneeById,

  // boards
  getBoards,
  getBoardById,
  getAllParamsForBoard,
  addBoard,
  updateBoardById,
  setDefaultBoard,
  deleteBoardById,

  // columns
  getColumns,
  getColumnById,
  getColumnsByBoardId,
  addColumn,
  updateColumnById,
  deleteColumnById,

  // items
  getItems,
  getItemById,
  getItemRelations,
  getItemsByBoardId,
  getItemsByColumnId,
  addItemRequest,
  updateItemRequest,
  deleteItemById,

  // tags
  getTags,
  createTag,
  updateTagById,
  deleteTagById,

  // itemTags
  getTagsByItemId,
  addItemTag,
  getItemTagRelationsByItemId,
  deleteItemTagById,

  //priority
  getPriorities,
  addPriority,
  updatePriorityById,
  deletePriorityById,
};
