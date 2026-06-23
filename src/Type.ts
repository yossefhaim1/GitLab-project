export interface Boards {
  id: number;
  title: string;
  isDefault: boolean;
}

export interface Columns {
  id: number;
  boardId: number;
  title: string;
  order: number;
  color: string;
}

export interface Items {
  id: number;
  boardId: number;
  columnId: number;
  position: number;
  title: string;

  assigneeId: number | null;
  priorityId: number | null;

  assignee?: User | null;
  priority?: Priority | null;
  tags: Tag[];
}

export interface User {
  id: number;
  name: string;
}

export interface ItemTag {
  id: number;
  itemId: number;
  tagId: number;
}

export interface Tag {
  id: number;
  title: string;
  color: string;
}

export interface Priority {
  id: number;
  type: PriorityTypeValues;
  color: string;
}

export const PriorityType = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
  CRITICAL: "CRITICAL",
} as const;

export type PriorityTypeValues =
  (typeof PriorityType)[keyof typeof PriorityType];


export const PRIORITY_TYPES: PriorityTypeValues[] = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

export type CreateUserPayload = Omit<User, "id">;
export type CreateItemPayload = {
  boardId: number;
  columnId: number;
  position: number;
  title: string;
  assigneeId: number | null;
  priorityId: number | null;
};
export type CreateColumnPayload = Omit<Columns, "id">;
export type CreateBoardPayload = Omit<Boards, "id">;
export type CreateTagPayload = Omit<Tag, "id">;
export type CreatePriorityPayload = Omit<Priority, "id">;
export type CreateItemTagPayload = Omit<ItemTag, "id">;

