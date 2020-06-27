import React from "react";
import { Column } from "./types";

export interface ColGroupProps {
	columns: Column[];
}

export const ColGroup: React.FC<ColGroupProps> = function ({ columns }) {
	return (
		<colgroup>
			{columns.map((column, i) => (
				<col
					key={column.key ?? i}
					style={{
						width: column.width,
						minWidth: column.minWidth || column.width,
						maxWidth: column.maxWidth,
					}}
				></col>
			))}
		</colgroup>
	);
};

export default ColGroup;
