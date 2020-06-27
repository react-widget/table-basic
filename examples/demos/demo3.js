import React, { Component } from "react";
import TableBasic from "../../src";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		width: 100,
		fixed: "left",
	},
	{
		title: "Other",
		children: [
			{
				title: "Age",
				dataIndex: "age",
				key: "age",
				width: 150,
				sorter: (a, b) => a.age - b.age,
			},
			{
				title: "Address",
				children: [
					{
						title: "Street",
						dataIndex: "street",
						key: "street",
						width: 150,
					},
					{
						title: "Block",
						children: [
							{
								title: "Building",
								dataIndex: "building",
								key: "building",
								width: 150,
							},
							{
								title: "Door No.",
								dataIndex: "number",
								key: "number",
								width: 150,
							},
						],
					},
				],
			},
		],
	},
	{
		title: "Company",
		children: [
			{
				title: "Company Address",
				dataIndex: "companyAddress",
				key: "companyAddress",
				width: 100,
			},
			{
				title: "Company Name",
				dataIndex: "companyName",
				key: "companyName",
				width: 100,
			},
		],
	},
];

const rightColumns = [
	{
		title: "Gender",
		dataIndex: "gender",
		key: "gender",
		width: 180,
		getHeaderCellProps(props, column, index) {
			props.style = {
				...props.style,
				position: "sticky",
				right: 0,
			};

			return props;
		},
		getCellProps(props, data, index) {
			props.style = {
				...props.style,
				position: "sticky",
				right: 0,
			};

			return props;
		},
	},
];

columns.push(...rightColumns);

const data = [];
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		name: "John Brown",
		age: i + 1,
		street: "Lake Park",
		building: "C",
		number: 2035,
		companyAddress: "Lake Street 42",
		companyName: "SoftLake Co",
		gender: "M",
	});
}

export default class DEMO extends Component {
	theadRef = React.createRef();
	tbodyRef = React.createRef();

	// 滚动同步
	handleScroll = (e) => {
		this.theadRef.current.style.marginLeft = -this.tbodyRef.current.scrollLeft + "px";
	};

	render() {
		const TableProps = {
			getHeaderCellProps(props, column, index) {
				if (column.fixed) {
					props.style = {
						...props.style,
						position: "sticky",
						right: 0,
					};
				}

				return props;
			},
			getBodyCellProps(props, data, column, index) {
				if (column.fixed) {
					props.style = {
						...props.style,
						position: "sticky",
						right: 0,
					};
				}

				return props;
			},
		};

		return (
			<div className="fixed-column">
				<div className="table-demo2">
					<div className="thead">
						<div className="thead-inner" ref={this.theadRef}>
							<TableBasic
								{...TableProps}
								columns={columns}
								data={data}
								showHeader
								showBody={false}
								tableLayout="fixed"
							/>
						</div>
					</div>
					<div className="tbody" ref={this.tbodyRef} onScroll={this.handleScroll}>
						<TableBasic
							{...TableProps}
							columns={columns}
							data={data}
							showHeader={false}
							showBody
							tableLayout="fixed"
						/>
					</div>
				</div>
			</div>
		);
	}
}
