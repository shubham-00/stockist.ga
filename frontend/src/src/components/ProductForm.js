import { connect } from "react-redux";
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import { useRef } from "react";
import axios from "axios";
import * as productActions from "../store/actions/productActions";
import * as authActions from "../store/actions/authAction";

const baseUrl = "http://127.0.0.1:8000/";

const ProductForm = (props) => {
	const formRef = useRef();

	const onFinish = (values) => {
		createProduct(props.token, values, props.productList);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const createProduct = (token, data, productList) => {
		axios
			.post(
				`${baseUrl}products/create/`,
				{ ...data },
				{
					validateStatus: (status) => {
						return status < 500;
					},
					headers: {
						Authorization: `Token ${token}`,
					},
				},
			)
			.then((res) => {
				console.log(res);
				if (res.data.error !== null && res.data.detail !== undefined) {
					props.logout();
					notification.error({
						message: "Access denied!",
						description: null,
						duration: 3,
					});
					window.location = "/";
				} else if (Array.isArray(res.data.name)) {
					props.setError("'Name' field is required");
				} else if (Array.isArray(res.data.description)) {
					props.setError("'Description' field is required");
				} else if (Array.isArray(res.data.opening)) {
					props.setError("'Opening stock' field is required");
				} else if (Array.isArray(res.data.unit)) {
					props.setError("'Unit' field is required");
				} else {
					let newProduct = res.data;

					productList.push(newProduct);
					props.fetchSuccess(productList);
					notification.success({
						message: "Product added!",
						description: null,
						duration: 3,
					});
					formRef.current.resetFields();
				}
			})
			.catch((err) => {
				console.log("Something went wrong");
			});
	};

	return (
		<>
			<div className="row">
				<div className="col-sm-10 col-md-6 col-lg-4 mx-auto">
					<div className="card p-5">
						<div className="card-body">
							<h3 className="text-center">
								<u>Add a new product</u>
							</h3>
							<Form
								preserve={false}
								layout="vertical"
								name="basic"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								ref={formRef}>
								<Form.Item
									label="Name"
									name="name"
									rules={[
										{
											required: true,
											message: "Enter your product's name!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									label="Description"
									name="description"
									initialValue=""
									rules={[
										{
											required: false,
											message: "Enter your product's description!",
										},
									]}>
									<Input.TextArea rows={5} showCount maxLength={1000} />
								</Form.Item>

								<Form.Item
									label="Opening stock"
									name="opening"
									initialValue={0}
									rules={[
										{
											required: false,
											message: "Enter your product's opening stock!",
										},
									]}>
									<InputNumber />
								</Form.Item>

								<Form.Item
									label="Unit"
									name="unit"
									initialValue={"kg"}
									rules={[
										{
											required: false,
											message: "Enter your product's unit!",
										},
									]}>
									<Select>
										<Select.Option value="kg">kg</Select.Option>
										<Select.Option value="bag">bag</Select.Option>
										<Select.Option value="mtr">mtr</Select.Option>
										<Select.Option value="nos">nos</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit">
										Submit
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		productList: state.products.list,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(authActions.logout());
		},
		setError: (msg) => {
			dispatch(productActions.setError(msg));
		},
		fetchSuccess: (productList) => {
			dispatch(productActions.fetchSuccess(productList));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
