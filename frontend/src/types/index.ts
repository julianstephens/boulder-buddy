import React from "react";

export type ChildrenProps = {
  children: React.ReactNode;
};

export type EventHandler = (e: React.SyntheticEvent) => void;

export type ErrorHandler = (err: unknown) => void;

export type Grouped<T> = {
  [k: string]: T[];
};

export type GetInfinitePagesInterface<T> = {
  nextId?: number;
  previousId?: number;
  data: T;
  count: number;
};

export * from "./api";
