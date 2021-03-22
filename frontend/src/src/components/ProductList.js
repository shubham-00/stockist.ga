import { connect } from "react-redux";
import { Table, Tag, Space } from "antd";

const ProductList = (props) => {
	const { Column, ColumnGroup } = Table;

	const data = [
		{
			key: "1",
			firstName: "John",
			lastName: "Brown",
			age: 32,
			address: "New York No. 1 Lake Park",
			tags: ["nice", "developer"],
		},
		{
			key: "2",
			firstName: "Jim",
			lastName: "Green",
			age: 42,
			address: "London No. 1 Lake Park",
			tags: ["loser"],
		},
		{
			key: "3",
			firstName: "Joe",
			lastName: "Black",
			age: 32,
			address: "Sidney No. 1 Lake Park",
			tags: ["cool", "teacher"],
		},
	];

	return (
		<>
			<Table dataSource={props.productList} pagination={false}>
				<Column title="Name" dataIndex="name" key="name" align="center" />
				<Column
					title="Opening"
					dataIndex="opening"
					key="opening"
					align="center"
				/>
				<Column
					title="Current"
					dataIndex="current"
					key="current"
					align="center"
				/>
				<Column title="Unit" dataIndex="unit" key="unit" align="center" />
				<Column
					title="Description"
					dataIndex="description"
					key="description"
					align="center"
				/>
			</Table>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		productList: state.products.list,
	};
};

export default connect(mapStateToProps)(ProductList);
