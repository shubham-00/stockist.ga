import * as actionTypes from "./actionTypes";
import axios from "axios";
import { notification } from "antd";
import * as productActions from "./productActions";
import * as entryActions from "./entryActions";

const baseUrl = "http://127.0.0.1:8000/";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: { token },
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		payload: { error },
	};
};

export const logout = () => {
	if (window.location.pathname !== "/") {
		window.location = "/";
	}

	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const resetError = () => {
	return { type: actionTypes.RESET_ERROR };
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");

		if (token === null || token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate < new Date()) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));

				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000,
					),
				);
				dispatch(productActions.fetchProducts(token));
				dispatch(entryActions.fetchEntries(token));
			}
		}
	};
};

export const login = (username, password) => {
	return (dispatch) => {
		dispatch(authStart());

		axios
			.post(
				`${baseUrl}users/login/`,
				{
					username,
					password,
				},
				{
					validateStatus: (status) => {
						return status < 500;
					},
				},
			)
			.then((res) => {
				if (res.data.key !== null && res.data.key !== undefined) {
					const token = res.data.key;

					const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

					localStorage.setItem("token", token);
					localStorage.setItem("expirationDate", expirationDate);

					dispatch(authSuccess(token));
					dispatch(productActions.fetchProducts(token));
					dispatch(entryActions.fetchEntries(token));

					checkAuthTimeout(3600 * 1000); // 1 hour
					notification.success({
						message: "Successfully Logged In, yay!",
						description: null,
						// onClose: props.resetMessage(),
						duration: 3,
					});
				} else {
					dispatch(authFail(res.data.error));
				}
			})
			.catch((err) => {
				dispatch(authFail("Invalid username or password"));
				setTimeout(() => {
					dispatch(resetError());
				}, 5000);
			});
	};
};
