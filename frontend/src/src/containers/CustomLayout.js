import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, notification } from "antd";
import * as actions from "../store/actions/authAction";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const CustomLayout = (props) => {
	const { Header, Content, Footer } = Layout;

	const [selectedKey, setSelectedKey] = useState(["home"]);

	useEffect(() => {
		if (props.message) {
			notification.info({
				message: props.message,
				description: null,
				onClose: props.resetMessage(),
			});
			props.resetMessage();
		}
	});

	return (
		<>
			<Layout className="layout">
				<Header className="">
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["home"]}
						selectedKeys={selectedKey}
						overflowedIndicator={<MenuOutlined />}
						triggerSubMenuAction="hover">
						<Menu.Item
							key="home"
							onClick={() => {
								setSelectedKey(["home"]);
							}}>
							<Link to="/">Home</Link>
						</Menu.Item>

						{props.token ? (
							<>
								<Menu.SubMenu key="products" title="Products" theme="dark">
									<Menu.Item
										key="productCreate"
										onClick={() => {
											setSelectedKey(["productCreate"]);
										}}>
										<Link to="/products/create/">Create</Link>
									</Menu.Item>

									<Menu.Item
										key="productList"
										onClick={() => {
											setSelectedKey(["productList"]);
										}}>
										<Link to="/products/list/">View</Link>
									</Menu.Item>
								</Menu.SubMenu>

								<Menu.Item key="/logout/" onClick={() => props.logout()}>
									Logout
								</Menu.Item>
							</>
						) : (
							<>
								<Menu.Item
									key="login"
									onClick={() => {
										setSelectedKey(["login"]);
									}}>
									<Link to="/login/">Login</Link>
								</Menu.Item>
							</>
						)}
					</Menu>
				</Header>
				<Content>
					<div className="site-layout-content">{props.children}</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>Footer </Footer>
			</Layout>
		</>
	);
};

const mapStateToProps = (state) => {
	return { token: state.auth.token };
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(actions.logout());
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CustomLayout),
);
