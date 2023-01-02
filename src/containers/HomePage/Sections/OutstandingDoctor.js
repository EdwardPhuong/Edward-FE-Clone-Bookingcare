import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

import Slider from "react-slick";

class OutstandingDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
		};
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
			this.setState({
				arrDoctors: this.props.topDoctorsRedux,
			});
		}
	}
	componentDidMount() {
		this.props.loadTopdoctors();
	}

	handleViewDetailsDoctor = (doctor) => {
		if (this.props.history) {
			this.props.history.push(`/details-doctor/${doctor.id}`);
		}
	};
	render() {
		let allDoctors = this.state.arrDoctors;
		let { language } = this.props;
		return (
			<div className="section-share section-outstanding-doctor">
				<div className="section-container">
					<div className="section-header section-outstanding-doctor">
						<span className="title-section">
							<FormattedMessage id="homepage.outstanding-doctor" />
						</span>
						<button className="btn-section">
							<FormattedMessage id="homepage.more-info" />
						</button>
					</div>
					<div className="section-body">
						<Slider {...this.props.setting}>
							{allDoctors &&
								allDoctors.length > 0 &&
								allDoctors.map((doctor, index) => {
									let imageBase64 = "";
									if (doctor.image) {
										imageBase64 = new Buffer(doctor.image, "base64").toString(
											"binary"
										);
									}
									let nameVi = `${doctor.positionData.value_vi}, ${doctor.lastName} ${doctor.firstName} `;
									let nameEn = `${doctor.positionData.value_en}, ${doctor.firstName} ${doctor.lastName}`;
									return (
										<div
											className="section-customize"
											key={index}
											onClick={() => this.handleViewDetailsDoctor(doctor)}
										>
											<div className="customize-border">
												<div className="outer-bg">
													<div
														className="bg-image section-outstanding-doctor"
														style={{
															backgroundImage: `url(${imageBase64})`,
														}}
													></div>
												</div>
												<div className="position text-center">
													<div className="edit-text">
														{language === LANGUAGES.VI
															? nameVi
															: nameEn}
													</div>
												</div>
											</div>
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
		isLoggedIn: state.user.isLoggedIn,
		topDoctorsRedux: state.admin.topDoctors,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopdoctors: () => dispatch(actions.fetchTopDoctor()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
