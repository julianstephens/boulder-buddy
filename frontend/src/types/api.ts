import { components } from "./openapi";

export type Meso = components["schemas"]["handlers.Mesocycle"];

export type ApiError = components["schemas"]["handlers.Error"];

export type ValidationError = {
  path: string;
  tag: string;
  message: string;
};
