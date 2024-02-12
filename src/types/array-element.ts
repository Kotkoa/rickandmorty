export type ArrayElementT<T> = T extends (infer U)[] ? U : never;
