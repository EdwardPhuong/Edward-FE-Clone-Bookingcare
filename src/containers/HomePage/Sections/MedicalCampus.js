import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";

import userService from "../../../services/userService";
import "./MedicalCampus.scss";

class MedicalCampus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataClinic: [],
		};
	}

	async componentDidMount() {
		let response = await userService.getAllClinic();
		if (response && response.errCode === 0) {
			this.setState({ dataClinic: response.data ? response.data : [] });
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {}

	handleViewDetailsClinic = (clinic) => {
		if (this.props.history) {
			this.props.history.push(`/details-clinic/${clinic.id}`);
		}
	};
	render() {
		let { dataClinic } = this.state;
		return (
			<div className="section-share section-medical-campus">
				<div className="section-container">
					<div className="section-header">
						<span className="title-section">Cơ Sở Y Tế Nổi Bật</span>
						<button className="btn-section">Xem Thêm</button>
					</div>

					<div className="section-body">
						<Slider {...this.props.setting}>
							{dataClinic &&
								dataClinic.length > 0 &&
								dataClinic.map((item, index) => {
									return (
										<div
											className="section-customize clinic-child"
											key={index}
											onClick={() => this.handleViewDetailsClinic(item)}
										>
											<div
												className="bg-image section-medical-campus"
												style={{ backgroundImage: `url(${item.image})` }}
											></div>
											<div className="clinic-name">{item.name}</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalCampus));
