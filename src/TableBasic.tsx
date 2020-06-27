import React from "react";
import classnames from "classnames";
import { TreeStore } from "xtree-store";
import tableMultipleHeader, { TCell } from "table-multiple-header";
import TableBasicContext from "./TableBasicContext";
import TableBasicHeader from "./TableBasicHeader";
import TableBasicBody from "./TableBasicBody";
import TableBasicColGroup from "./TableBasicColGroup";
import { Column, DataType, RenderProps } from "./types";

export interface TableBasicProps<T = DataType> {
	prefixCls?: string;
	className?: string;

	style?: React.CSSProperties;

	columns: Column<T>[];

	data: T[];

	tableLayout?: "auto" | "fixed";

	getHeaderRowProps?: (
		props: RenderProps,
		columns: TCell<Column<T>>[],
		index: number
	) => RenderProps;
	getRowProps?: (props: RenderProps, data: T, index: number) => RenderProps;

	getRowKey: (data: T, index: number) => React.Key;
	getRowClassName?: (data: T, index: number) => string;

	showHeader?: boolean;
	showBody?: boolean;
	// TODO:
	// showFooter: boolean;

	emptyText?: React.ReactNode;

	// rowRender: any;
	// rowHeaderRender: any;

	emptyRender(props: RenderProps): React.ReactNode;
	tableRender(props: RenderProps): React.ReactNode;
	headerRender: (props: RenderProps) => React.ReactElement | null;
	headerRowRender: (props: RenderProps) => React.ReactElement | null;
	headerCellRender: (props: RenderProps) => React.ReactElement | null;
	bodyRender: (props: RenderProps) => React.ReactElement | null;
	bodyRowRender: (props: RenderProps) => React.ReactElement | null;
	bodyCellRender: (props: RenderProps) => React.ReactElement | null;
	// footerRender: (props: RenderProps) => React.ReactElement | null;
	// footerRowRender: (props: RenderProps) => React.ReactElement | null;
	// footerCellRender: (props: RenderProps) => React.ReactElement | null;
}

export interface TableBasicState<T = DataType> {
	columns: Column<T>[];
	flattenColumns: Column<T>[];
	columnStore: TreeStore;
	leafColumns: Column<T>[];
	computedColumn: TCell<Column<T>>[][];
}

let kIdx = 1;

export class TableBasic<T = DataType> extends React.Component<
	TableBasicProps<T>,
	TableBasicState<T>
> {
	static defaultProps: TableBasicProps = {
		prefixCls: "rw-table",
		tableLayout: "auto",
		columns: [],
		data: [],
		showHeader: true,
		showBody: true,
		// TODO:
		// showFooter: false,

		getRowKey(data, index) {
			return data["key"] ?? index;
		},

		emptyText: "No Data.",

		emptyRender(props) {
			return <div {...props} />;
		},
		tableRender(props) {
			return <table {...props} />;
		},
		headerRender(props) {
			return <thead {...props} />;
		},
		headerRowRender(props) {
			return <tr {...props} />;
		},
		headerCellRender(props) {
			return <th {...props} />;
		},
		bodyRender(props) {
			return <tbody {...props} />;
		},
		bodyRowRender(props) {
			return <tr {...props} />;
		},
		bodyCellRender(props) {
			return <td {...props} />;
		},
	};

	static getDerivedStateFromProps(nextProps: TableBasicProps, state: TableBasicState) {
		const columnStore =
			nextProps.columns === state.columns
				? state.columnStore
				: new TreeStore(nextProps.columns, {
						childrenField: "children",
						idField: "key",
						dataProcessor(data) {
							data.key == data.key ?? `c_key_${kIdx++}`;
							return data;
						},
				  });
		const computedColumn =
			nextProps.columns === state.columns
				? state.computedColumn
				: tableMultipleHeader<Column>(columnStore);

		const flattenColumns =
			nextProps.columns === state.columns
				? state.flattenColumns
				: columnStore.getAllChildren().map((node) => node.data);

		const leafColumns =
			nextProps.columns === state.columns
				? state.leafColumns
				: columnStore
						.getAllChildren()
						.filter((node) => columnStore.isLeaf(node.id))
						.map((node) => node.data);

		return {
			columns: nextProps.columns,
			flattenColumns,
			columnStore,
			leafColumns,
			computedColumn,
		};
	}

	state: Readonly<TableBasicState<T>> = {
		columns: [],
		flattenColumns: [],
		columnStore: {} as TreeStore,
		computedColumn: [],
		leafColumns: [],
	};

	getTableLayout() {
		let { tableLayout } = this.props;
		const { flattenColumns } = this.state;
		const hasEllipsisColumn = flattenColumns.some((column) => column.ellipsis);

		if (hasEllipsisColumn) {
			return "fixed";
		}

		return tableLayout;
	}

	render() {
		const { tableRender, prefixCls, className, showHeader, showBody, style } = this.props;
		const { leafColumns } = this.state;
		const tableProps = {
			className: classnames(prefixCls, className),
			cellPadding: 0,
			cellSpacing: 0,
			style: {
				tableLayout: this.getTableLayout(),
				...style,
			},
			children: (
				<>
					<TableBasicColGroup columns={leafColumns} />
					{showHeader ? <TableBasicHeader /> : null}
					{showBody ? <TableBasicBody /> : null}
				</>
			),
		};

		return (
			<TableBasicContext.Provider value={{ table: this }}>
				{tableRender(tableProps)}
			</TableBasicContext.Provider>
		);
	}
}

export default TableBasic;
