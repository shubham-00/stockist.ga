import { Route } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductEdit from "./components/ProductEdit";
import EntryCreate from "./components/EntryCreate";
import EntryList from "./components/EntryList";

const BaseRouter = (props) => {
	return (
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/login/" component={Login} />
			<Route exact path="/products/list/" component={ProductList} />
			<Route exact path="/products/create/" component={ProductCreate} />
			<Route exact path="/products/edit/:pk/" component={ProductEdit} />
			<Route exact path="/entries/list/" component={EntryList} />
			<Route exact path="/entries/create/" component={EntryCreate} />

			{/* <Route exact path="/article/:articleID/" component={ArticleDetail} /> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { token: state.auth.token };
};

export default connect(mapStateToProps, null)(BaseRouter);
