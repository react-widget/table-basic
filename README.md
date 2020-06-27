# react-widget-table-basic

Table基础组件


## 安装

```
npm install --save react-widget-table-basic
```

## 使用

[![Edit react-widget-table-basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-widget-table-basic-jujcd?fontsize=14&hidenavigation=1&theme=dark)

```js
import TableBasic from 'react-widget-table-basic';
import 'react-widget-table-basic/style';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

<TableBasic data={dataSource} columns={columns} />;

```

### Interfaces

```ts
export interface TableBasicProps<T = DataType> {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    columns: Column<T>[];
    data: T[];
    tableLayout?: "auto" | "fixed";
    getHeaderRowProps?: (props: RenderProps, columns: TCell<Column<T>>[], index: number) => RenderProps;
    getRowProps?: (props: RenderProps, data: T, index: number) => RenderProps;
    getRowKey: (data: T, index: number) => React.Key;
    getRowClassName?: (data: T, index: number) => string;
    showHeader?: boolean;
    showBody?: boolean;
    emptyText?: React.ReactNode;
    emptyRender(props: RenderProps): React.ReactNode;
    tableRender(props: RenderProps): React.ReactNode;
    headerRender: (props: RenderProps) => React.ReactElement | null;
    headerRowRender: (props: RenderProps) => React.ReactElement | null;
    headerCellRender: (props: RenderProps) => React.ReactElement | null;
    bodyRender: (props: RenderProps) => React.ReactElement | null;
    bodyRowRender: (props: RenderProps) => React.ReactElement | null;
    bodyCellRender: (props: RenderProps) => React.ReactElement | null;
}
export interface TableBasicState<T = DataType> {
    columns: Column<T>[];
    flattenColumns: Column<T>[];
    columnStore: TreeStore;
    leafColumns: Column<T>[];
    computedColumn: TCell<Column<T>>[][];
}

export declare type DataType = Record<any, any>;
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
}
export interface RenderProps extends React.AllHTMLAttributes<any> {
    key?: React.Key;
    ref?: React.Ref<any>;
    children: React.ReactNode;
    [x: string]: any;
}

```

### defaultProps

```js
{
	prefixCls: "rw-table",
	tableLayout: "auto",
	columns: [],
	data: [],
	showHeader: true,
	showBody: true,

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
}
```

### 基础样式

```css
.rw-table {
    width: 100%;
    table-layout: auto;
    text-align: left;
    border-style: solid;
    border-width: 1px 0 0 1px;
    border-color: #e8e8e8;
}

.rw-table-head-cell {
    padding: 4px 10px;
    background-color: #fafafa;
    border-color: #e8e8e8;
    border-style: solid;
    border-width: 0 1px 1px 0;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.85);
    overflow-wrap: break-word;
}

.rw-table-body-cell {
    padding: 4px 10px;
    border-color: #e8e8e8;
    border-style: solid;
    border-width: 0 1px 1px 0;
    line-height: 28px;
    background-color: #fff;
    overflow-wrap: break-word;
}

.rw-table-cell-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
}

.rw-table-empty-text {
    background-color: #fff;
    text-align: center;
}

```
