export const PriorityType = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
  CRITICAL: "CRITICAL",
} as const;

export type PriorityTypeValues =
  (typeof PriorityType)[keyof typeof PriorityType];


