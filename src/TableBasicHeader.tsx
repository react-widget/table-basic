import React from "react";
import classnames from "classnames";
import TableBasicContext from "./TableBasicContext";

export const Thead: React.FC = function () {
	const ctx = React.useContext(TableBasicContext);
	if (!ctx) return null;

	const {
		prefixCls,
		getHeaderRowProps,
		headerRender,
		headerRowRender,
		headerCellRender,
	} = ctx.table.props;
	const { computedColumn } = ctx.table.state;

	const children = computedColumn.map(
		(row, i): React.ReactNode => {
			const trCls = classnames(`${prefixCls}-head-row`);
			let trProps: any = {
				key: i,
				className: trCls,
			};

			trProps = getHeaderRowProps ? getHeaderRowProps(trProps, row, i) : trProps;

			trProps.children = row.map((hCell, i) => {
				const column = hCell.data;
				let thProps: any = {
					rowSpan: hCell.rowSpan,
					colSpan: hCell.colSpan,
					key: column.key ?? column.dataIndex ?? i,
					className: classnames(`${prefixCls}-head-cell`, column.className, {
						[`${prefixCls}-cell-ellipsis`]: column.ellipsis,
					}),
					style: {
						textAlign: column.align,
					},
				};

				thProps = column.getHeaderCellProps
					? column.getHeaderCellProps(thProps, column, i)
					: thProps;

				thProps.children = column.headerRender
					? column.headerRender(column.title, column, i)
					: column.title;

				if (thProps.rowSpan === 0 || thProps.colSpan === 0) {
					return null;
				}

				return headerCellRender(thProps);
			});

			return headerRowRender(trProps);
		}
	);

	return headerRender({
		children,
	});
};

export default Thead;
