import * as actionTypes from "./actionTypes";
import axios from "axios";
import { notification } from "antd";
import * as authActions from "./authAction";

const baseUrl = "http://127.0.0.1:8000/";

export const fetchStart = () => {
	return {
		type: actionTypes.FETCH_START,
	};
};

export const fetchSuccess = (list) => {
	return {
		type: actionTypes.FETCH_SUCCESS,
		payload: { list },
	};
};

export const fetchFail = (error) => {
	return {
		type: actionTypes.FETCH_FAIL,
		payload: { error },
	};
};

export const setError = (error) => {
	return { type: actionTypes.SET_ERROR, payload: { error } };
};

export const resetError = () => {
	return { type: actionTypes.RESET_ERROR };
};

export const fetchProducts = (token) => {
	return (dispatch) => {
		dispatch(fetchStart());

		axios
			.post(
				`${baseUrl}products/list/`,
				{},
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
				if (res.data.detail !== null && res.data.detail !== undefined) {
					dispatch(authActions.logout());
					notification.error({
						message: "Access denied!",
						description: null,
						duration: 3,
					});
					window.location = "/";
				} else {
					dispatch(fetchSuccess(res.data));
				}
			})
			.catch((err) => {
				console.log("Something went wrong");
			});
	};
};
