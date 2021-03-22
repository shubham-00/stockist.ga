import { connect } from "react-redux";
import simpleImage from "../images/simple.jpg";
import accessibleImage from "../images/accessible.jpg";
import securityImage from "../images/security.jpg";
import privacyImage from "../images/privacy.jpg";
import "../css/home.css";

const Home = (props) => {
	return (
		<>
			<div style={{ background: "white" }}>
				{/* Header */}
				<div
					className="customHeader text-center"
					style={{ paddingTop: "40vh", paddingBottom: "40vh", margin: 0 }}>
					<div className="overlay"></div>
					<div
						className="writing p-0 m-0"
						style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}></div>
				</div>
				{/* /Header */}

				<div hidden className="container">
					{/* Features */}

					{/* Simple */}
					<div class="card border-0 py-5">
						<div class="row g-0 d-flex align-items-center">
							<div class="col-md-4 order-sm-1 order-md-1">
								<img src={simpleImage} alt="..." className="card-img" />
							</div>
							<div class="col-md-8 order-sm-2 order-md-2">
								<div class="card-body">
									<h2 class="card-title text-decoration-underline">
										Simple Design, Easy to Use.
									</h2>
									<h4 class="card-text">
										Our design is very simple and easy to understand. It is
										built for daily use. It is as easy as using a note and a
										pen.
									</h4>
								</div>
							</div>
						</div>
					</div>
					{/* /Simple */}

					{/* Accessible */}
					<div class="card border-0 py-5">
						<div class="row g-0 d-flex align-items-center">
							<div class="col-md-4 order-sm-1 order-md-2">
								<img src={accessibleImage} alt="..." className="card-img" />
							</div>
							<div class="col-md-8 order-sm-2 order-md-1">
								<div class="card-body">
									<h2 class="card-title text-decoration-underline">
										Accessible across all devices all over the world.
									</h2>
									<h4 class="card-text">
										All your notes are stored in the cloud. You can access your
										notes on any device, no matter where you are.
									</h4>
								</div>
							</div>
						</div>
					</div>
					{/* /Accessible */}

					{/* Secure */}
					<div class="card border-0 py-5">
						<div class="row g-0 d-flex align-items-center">
							<div class="col-md-4 order-sm-1 order-md-1">
								<img src={securityImage} alt="..." className="card-img" />
							</div>
							<div class="col-md-8 order-sm-2 order-md-2">
								<div class="card-body">
									<h2 class="card-title text-decoration-underline">
										All your notes are secure.
									</h2>
									<h4 class="card-text">
										All the data are encrypted and stored as a Gibberish text.
										Even if the data are exposed, they are not meaningful.
									</h4>
								</div>
							</div>
						</div>
					</div>
					{/* /Secure */}

					{/* Private */}
					<div class="card border-0 py-5">
						<div class="row g-0 d-flex align-items-center">
							<div class="col-md-4 order-sm-1 order-md-2">
								<img src={privacyImage} alt="..." className="card-img" />
							</div>
							<div class="col-md-8 order-sm-2 order-md-1">
								<div class="card-body">
									<h2 class="card-title text-decoration-underline">
										Your privacy matters.
									</h2>
									<h4 class="card-text">
										We value your privacy. All your data are private, not shared
										with anyone, and not even used for any other activities.
									</h4>
								</div>
							</div>
						</div>
					</div>
					{/* /Private */}

					{/* /Features */}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	};
};

export default connect(mapStateToProps)(Home);
