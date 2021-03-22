import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { entryReducer } from "./entryReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer,
	entries: entryReducer,
});

export { rootReducer };
