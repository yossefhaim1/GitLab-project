export type CreateTagDto = {
    title: string;
    color: string;
}

export type UpdateTagDto = {
    title?: string;
    color?: string;
}