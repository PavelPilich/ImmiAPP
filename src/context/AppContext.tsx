import { createContext } from "react";
import type { AppContextType } from "../types";

export const AppCtx = createContext<AppContextType | null>(null);
