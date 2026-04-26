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
    statusKey: string;
    color: string;
}

interface Priority {
    type: string;
    color: string
}
interface Tag {
    type: string;
    color: string
}
export interface Items {
    id: number;
    boardId: number;
    columnId: number;
    position: number;
    title: string;
    status: string;
    assigneeId: number;
    priority: Priority[];
    tags: Tag[];
}

export interface Statuses {
    id: number;
    key: string;
    value: string;
    order: number;
}

export type CreateItemPayload = Omit<Items, "id">;
export type CreateColumnPayload = Omit<Columns, "id">;
export type CreateBoardPayload = Omit<Boards, "id" | "isDefault">;
export type CreateStatusPayload = Omit<Statuses, "id">;