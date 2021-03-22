const initialState = {
	list: [],
	loading: false,
	error: null,
};

const entryReducer = (state = initialState, action) => {
	if (action.type === "ENTRY_FETCH_START") {
		console.log("ENTRY_FETCH_START");
		return { ...state, loading: true };
	}

	if (action.type === "ENTRY_FETCH_SUCCESS") {
		console.log("ENTRY_FETCH_SUCCESS");
		return {
			...state,
			loading: false,
			list: action.payload.list,
		};
	}

	if (action.type === "ENTRY_FETCH_FAIL") {
		console.log("ENTRY_FETCH_FAIL");
		return { ...state, loading: false, error: action.payload.error };
	}

	if (action.type === "ENTRY_SET_ERROR") {
		console.log("ENTRY_SET_ERROR");
		return { ...state, error: action.payload.error };
	}

	if (action.type === "ENTRY_RESET_ERROR") {
		console.log("ENTRY_RESET_ERROR");
		return { ...state, error: null };
	}

	return state;
};

export { entryReducer };
