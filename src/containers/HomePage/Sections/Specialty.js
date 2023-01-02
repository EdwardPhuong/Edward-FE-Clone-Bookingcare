import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { withRouter } from "react-router";

import userService from "../../../services/userService";
import "./Specialty.scss";

class Specialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSpecialty: [],
		};
	}
	async componentDidMount() {
		let response = await userService.getAllSpecialty();
		if (response && response.errCode === 0) {
			this.setState({
				dataSpecialty: response.data ? response.data : "",
			});
		}
	}

	handleViewDetailsSpecialty = (item) => {
		if (this.props.history) {
			this.props.history.push(`/details-specialty/${item.id}`);
		}
	};
	render() {
		let { dataSpecialty } = this.state;
		console.log("Check data", this.state);
		return (
			<div className="section-share section-specialty">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">
							<FormattedMessage id="home-header.popular-speciality" />
						</span>
						<button className="btn-section">Xem Thêm</button>
					</div>

					<div className="section-body">
						<Slider {...this.props.setting}>
							{dataSpecialty &&
								dataSpecialty.length > 0 &&
								dataSpecialty.map((item, index) => {
									return (
										<div
											className="section-customize specialty-child"
											key={index}
											onClick={() => this.handleViewDetailsSpecialty(item)}
										>
											<div
												className="bg-image section-specialty"
												style={{ backgroundImage: `url(${item.image})` }}
											></div>
											<div className="specialty-name">{item.name}</div>
										</div>
									);
								})}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
