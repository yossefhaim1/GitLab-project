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
