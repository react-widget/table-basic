import React, { Component } from "react";
import TableBasic from "../../src";

const columns = [
	{
		align: "right",
		title: "Name",
		dataIndex: "name",
		key: "name",
		width: 100,
		fixed: "left",
	},
	{
		title: "Other",
		align: "center",
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
								width: 100,
							},
							{
								title: "Door No.",
								dataIndex: "number",
								key: "number",
								width: 100,
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
				width: 200,
			},
			{
				ellipsis: true,
				width: 100,
				title: "Company Name",
				dataIndex: "companyName",
				key: "companyName",
			},
		],
	},
	{
		title: "Gender",
		dataIndex: "gender",
		key: "gender",
		width: 80,
		fixed: "right",
	},
];

const data = [];
for (let i = 0; i < 10; i++) {
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
	render() {
		return <TableBasic columns={columns} data={data} />;
	}
}
