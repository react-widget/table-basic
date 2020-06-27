import React from "react";
import classnames from "classnames";
import TableBasicContext from "./TableBasicContext";

export const Tbody: React.FC = function () {
	const ctx = React.useContext(TableBasicContext);

	if (!ctx) return null;

	const {
		prefixCls,
		data,
		bodyRender,
		bodyRowRender,
		bodyCellRender,
		emptyRender,
		getRowProps,
		getRowClassName,
		getRowKey,
		emptyText,
	} = ctx.table.props;
	const { leafColumns } = ctx.table.state;

	const children = data.length
		? data.map((rowData, i) => {
				const trCls = classnames(`${prefixCls}-body-row`, getRowClassName?.(rowData, i));
				let trProps: any = {
					key: getRowKey(rowData, i),
					className: trCls,
				};
				trProps = getRowProps ? getRowProps(trProps, rowData, i) : trProps;

				trProps.children = leafColumns.map((column, i) => {
					let tdProps: any = {
						key: column.key ?? column.dataIndex + "-" + trProps.key,
						className: classnames(`${prefixCls}-body-cell`, column.className, {
							[`${prefixCls}-cell-ellipsis`]: column.ellipsis,
						}),
						style: {
							textAlign: column.align,
						},
					};

					tdProps = column.getCellProps
						? column.getCellProps(tdProps, rowData, i)
						: tdProps;

					tdProps.children = column.render
						? column.render(rowData[column.dataIndex!], rowData, i)
						: rowData[column.dataIndex!];

					if (tdProps.rowSpan === 0 || tdProps.colSpan === 0) {
						return null;
					}

					return bodyCellRender(tdProps);
				});

				return bodyRowRender(trProps);
		  })
		: bodyRowRender({
				children: bodyCellRender({
					colSpan: leafColumns.length,
					className: classnames(`${prefixCls}-body-cell`, `${prefixCls}-cell-empty`),
					children: emptyRender({
						className: `${prefixCls}-empty-text`,
						children: emptyText,
					}),
				}),
		  });

	return bodyRender({
		children,
	});
};

export default Tbody;
