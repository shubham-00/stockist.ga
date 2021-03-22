import { connect } from "react-redux";
import { Table, Button } from "antd";

const EntryList = (props) => {
	const { Column } = Table;

	return (
		<>
			<Table dataSource={props.entryList} pagination={false}>
				<Column title="Product" dataIndex="name" key="name" align="center" />
				<Column
					title="Quantity"
					dataIndex="quantity"
					key="quantity"
					align="center"
				/>
				<Column title="User" dataIndex="user" key="user" align="center" />
				{/* <Column title="Unit" dataIndex="unit" key="unit" align="center" />
				<Column
					title="Description"
					dataIndex="description"
					key="description"
					align="center"
				/>
				<Column
					title="Edit"
					dataIndex="pk"
					key="pk"
					align="center"
					render={(text, record, index) => {
						return (
							<>
								<Button
									size="small"
									ghost
									type="primary"
									onClick={() => {
										props.history.push(`/products/edit/${text}`);
									}}>
									Edit
								</Button>
							</>
						);
					}}
				/> */}
			</Table>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		entryList: state.entries.list,
	};
};

export default connect(mapStateToProps)(EntryList);
