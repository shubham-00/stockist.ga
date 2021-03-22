const initialState = {
	list: [],
	loading: false,
	error: null,
};

const productReducer = (state = initialState, action) => {
	if (action.type === "FETCH_START") {
		console.log("FETCH_START");
		return { ...state, loading: true };
	}

	if (action.type === "FETCH_SUCCESS") {
		console.log("FETCH_SUCCESS");
		return {
			...state,
			loading: false,
			list: action.payload.list,
		};
	}

	if (action.type === "FETCH_FAIL") {
		console.log("FETCH_FAIL");
		return { ...state, loading: false, error: action.payload.error };
	}

	if (action.type === "SET_ERROR") {
		console.log("SET_ERROR");
		return { ...state, error: action.payload.error };
	}

	if (action.type === "RESET_ERROR") {
		console.log("RESET_ERROR");
		return { ...state, error: null };
	}

	return state;
};

export { productReducer };
