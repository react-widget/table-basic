import React from "react";
import TableBasic from "./TableBasic";
export interface ContextValue {
	table: TableBasic;
}

export default React.createContext<ContextValue | null>(null);
