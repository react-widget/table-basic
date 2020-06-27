import React from "react";
export type DataType = Record<any, any>;

export interface Column<T = DataType> {
	title?: React.ReactNode;
	dataIndex?: string | number;
	width?: string | number;
	minWidth?: string | number;
	maxWidth?: string | number;
	className?: string;
	key?: string | number;
	align?: "left" | "center" | "right";

	ellipsis?: boolean;

	children?: Column<T>[];

	render?: (text: any, data: T, index: number) => React.ReactNode;
	headerRender?: (text: any, column: Column<T>, index: number) => React.ReactNode;

	getCellProps?: (props: RenderProps, data: T, index: number) => RenderProps;
	getHeaderCellProps?: (props: RenderProps, column: Column<T>, index: number) => RenderProps;

	// TODO:
	//footerRender
}

export interface RenderProps extends React.AllHTMLAttributes<any> {
	key?: React.Key;
	ref?: React.Ref<any>;
	children: React.ReactNode;
	[x: string]: any;
}
