export interface Boards {
  id: number;
  name: string;
  isDefault: boolean;
}

export interface Columns {
  id: number;
  boardId: number;
  title: string;
  order: number;
  color: string;
}
export const PriorityType = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type PriorityTypeValues =
  (typeof PriorityType)[keyof typeof PriorityType];

interface Priority {
  type: PriorityTypeValues;
  color: string;
}
interface Tag {
  type: string;
  color: string;
}
export interface Items {
  id: number;
  boardId: number;
  columnId: number;
  position: number;
  title: string;
  assigneeId: string;
  priority: Priority[];
  tags: Tag[];
}

export interface User {
  id: number;
  name: string;
}

export type CreateUserPayload = Omit<User, "id">;
export type CreateItemPayload = Omit<Items, "id">;
export type CreateColumnPayload = Omit<Columns, "id">;
export type CreateBoardPayload = Omit<Boards, "id">;
