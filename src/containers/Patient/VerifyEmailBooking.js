import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import userService from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmailBooking.scss";

class VerifyEmailBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			statusVerify: false,
			errCode: 0,
		};
	}

	async componentDidMount() {
		if (this.props.location && this.props.location.search) {
			let urlParams = new URLSearchParams(this.props.location.search);
			let token = urlParams.get("token");
			let doctorId = urlParams.get("doctorId");
			let response = await userService.postVerifyBookAppointment({
				token: token,
				doctorId: doctorId,
			});
			if (response && response.errCode === 0) {
				this.setState({
					statusVerify: true,
					errCode: response.errCode,
				});
			} else {
				this.setState({
					statusVerify: true,
					errCode: response && response.errCode ? response.errCode : -1,
				});
			}
		}
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {}

	render() {
		let { language } = this.props;
		let { statusVerify, errCode } = this.state;
		return (
			<React.Fragment>
				<HomeHeader />
				<div className="verify-appointment-container">
					{statusVerify === false ? (
						<div>Loading Data...</div>
					) : (
						<div>
							{+errCode === 0 ? (
								<div className="info-booking">Xác Nhận Lịch Hẹn Thành Công !</div>
							) : (
								<div className="info-booking">
									Lịch Hẹn Không Tồn Tại Hoặc Đã Được Xác Nhận !
								</div>
							)}
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
