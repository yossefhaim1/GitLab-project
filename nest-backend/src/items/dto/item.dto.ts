export type CreateItemDto = {
    title: string;
    boardId: number;
    columnId: number;
    priorityId: number | null;
    assigneeId: number | null;
    position: number;
}

export type UpdateItemDto = {
    title?: string;
    boardId?: number;
    columnId?: number;
    priorityId?: number | null;
    assigneeId?: number | null;
    position?: number;
}