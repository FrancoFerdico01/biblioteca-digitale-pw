import { ApiError } from "../services/api";
import i18n from "./index";

export const getErrorMessage = (error: Error) =>
  error instanceof ApiError && error.status === 0
    ? i18n.t("common:serverUnreachable")
    : error.message;
