export type ChildrenProps = {
  children: React.ReactNode;
};

export type AppError = {
  message: string;
};

export type EventHandler = (e: React.SyntheticEvent) => void;

export type ErrorHandler = (err: unknown) => void;

export type Grouped<T> = {
  [k: string]: T[];
};
