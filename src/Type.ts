export interface Data {
    icon: any;
    username: string;
    email: string;
    type: Type;
}

export type Type = "developer" | "designer" | "manager";

export interface SearchData {
    id: number;
    icon: string;
    username: string;
    email: string;
    type: Type;
}

export interface Boards {
    id: string;
    name: string;
    isDefault: boolean;
}

export interface Columns {
    id: string;
    boardId: string;
    title: string;
    order: number;
    statusKey: string;
    color: string;
}

interface Priority{
    type: string;
    color: string
}
interface Tag {
    type: string;
    color: string
}
export interface Items {
    id: string;
    boardId: string;
    columnId: string;
    position: number;
    title: string;
    status: string;
    assigneeId: number;
    priority: Priority[];
    tags: Tag[];
}
