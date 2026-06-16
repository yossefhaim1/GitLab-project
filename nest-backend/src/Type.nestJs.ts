export const PriorityType = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type PriorityTypeValues =
  (typeof PriorityType)[keyof typeof PriorityType];

export interface User {
    id : number,
    name : string,
}

export interface board{
  id :number ,
  titel : string ,
  isDefault : boolean,
}

export interface column {
  id : number,
  name : string,
  boardId : number,
}
