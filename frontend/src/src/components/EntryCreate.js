import { connect } from "react-redux";
import {
	Form,
	Input,
	Button,
	InputNumber,
	Select,
	notification,
	Radio,
} from "antd";
import { useRef, useEffect } from "react";
import axios from "axios";
import * as productActions from "../store/actions/productActions";
import * as authActions from "../store/actions/authAction";

const baseUrl = "http://127.0.0.1:8000/";

const EntryCreate = (props) => {
	const formRef = useRef();
	const productRef = useRef();

	useEffect(() => {
		window.setTimeout(() => {
			productRef.current.focus();
		}, 1000);
	}, []);

	const onFinish = (values) => {
		console.log(values);
		let data = {};
		data.product = values.product;
		data.quantity = values.mode === "Sell" ? -values.quantity : values.quantity;

		createEntry(props.token, data);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const createEntry = (token, data) => {
		axios
			.post(
				`${baseUrl}entries/create/`,
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
				if (
					res.data.error !== null &&
					res.data.error !== undefined &&
					res.data.detail !== undefined &&
					res.data.detail !== null
				) {
					props.logout();
					notification.error({
						message: "Access denied!",
						description: null,
						duration: 3,
					});
					window.location = "/";
				} else if (Array.isArray(res.data.product)) {
					props.setError("'Product' field is required");
				} else if (Array.isArray(res.data.quantity)) {
					props.setError("'Quantity' field is required");
				} else {
					let entry = res.data;

					// updating product list
					for (let i = 0; i < props.productList.length; i++) {
						if (props.productList[i].pk === data.product) {
							props.productList[i].current += data.quantity;
						}
					}

					// updating entry list
					props.entryList.unshift(entry);

					props.fetchSuccess(props.productList);
					notification.success({
						message: "Product added!",
						description: null,
						duration: 3,
					});
					formRef.current.resetFields();
					productRef.current.focus();
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
									name="mode"
									initialValue="Sell"
									label=""
									rules={[{ required: true }]}>
									<Radio.Group>
										<Radio.Button value="Sell">Sell</Radio.Button>
										<Radio.Button value="Purchase">Purchase</Radio.Button>
									</Radio.Group>
								</Form.Item>

								<Form.Item
									name="product"
									label="Product"
									rules={[{ required: true }]}>
									<Select
										ref={productRef}
										showSearch
										optionFilterProp="children">
										{props.productList.map((product) => {
											return (
												<Select.Option key={product.pk} value={product.pk}>
													{product.name}
												</Select.Option>
											);
										})}
									</Select>
								</Form.Item>

								<Form.Item
									label="Quantity"
									name="quantity"
									rules={[{ required: true }]}>
									<InputNumber />
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
		entryList: state.entries.list,
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryCreate);
