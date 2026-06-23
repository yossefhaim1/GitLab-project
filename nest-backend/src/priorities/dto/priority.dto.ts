import{ PriorityTypeValues} from "../../Type.nestJs";
export type CreatePriorityDto = {
    type: PriorityTypeValues;
    color: string;
}

export type UpdatePriorityDto = {
    type?: PriorityTypeValues;
    color?: string;
}