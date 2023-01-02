import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

import "./DoctorExtraInfo.scss";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DoctorExtraInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowDetailsInfo: false,
			extraInfo: {},
		};
	}

	async componentDidMount() {
		if (this.props.doctorIdFromParent) {
			let response = await userService.getExtraInfoDoctorById(this.props.doctorIdFromParent);
			if (response && response.errCode === 0) {
				this.setState({
					extraInfo: response.data,
				});
			}
		}
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.language !== this.props.language) {
		}

		if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
			let response = await userService.getExtraInfoDoctorById(this.props.doctorIdFromParent);
			if (response && response.errCode === 0) {
				this.setState({
					extraInfo: response.data,
				});
			}
		}
	}

	showHideDetailsInfo = (status) => {
		this.setState({
			isShowDetailsInfo: status,
		});
	};
	render() {
		let { isShowDetailsInfo, extraInfo } = this.state;
		let { language } = this.props;
		return (
			<div className="doctor-extra-info-container">
				<div className="content-up">
					<div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
					<div className="name-clinic">
						{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
					</div>
					<div className="details-address">
						{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ""}
					</div>
				</div>
				<div className="content-down">
					{isShowDetailsInfo === false ? (
						<div className="short-info">
							<span className="price-title">Giá Khám:</span>
							{extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
								<NumberFormat
									value={extraInfo.priceTypeData.value_vi}
									displayType={"text"}
									thousandSeparator={true}
									suffix={"VND"}
								/>
							)}
							{extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
								<NumberFormat
									value={extraInfo.priceTypeData.value_en}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
							)}
							<span
								className="price-details"
								onClick={() => this.showHideDetailsInfo(true)}
							>
								Xem chi tiết
							</span>
						</div>
					) : (
						<React.Fragment>
							<div className="title-price">GIÁ KHÁM: </div>
							<div className="details-info">
								<div className="price">
									<span className="left">Giá khám</span>
									<span className="right">
										{extraInfo &&
											extraInfo.priceTypeData &&
											language === LANGUAGES.VI && (
												<NumberFormat
													value={extraInfo.priceTypeData.value_vi}
													displayType={"text"}
													thousandSeparator={true}
													suffix={"VND"}
												/>
											)}
										{extraInfo &&
											extraInfo.priceTypeData &&
											language === LANGUAGES.EN && (
												<NumberFormat
													value={extraInfo.priceTypeData.value_en}
													displayType={"text"}
													thousandSeparator={true}
													prefix={"$"}
												/>
											)}
									</span>
								</div>
								<div className="note">
									{extraInfo && extraInfo.note ? extraInfo.note : ""}
								</div>
							</div>
							<div className="payment">
								Người bệnh có thể thanh toán chi phí bằng hình thức:
								<span className="payment-method">
									{extraInfo &&
									extraInfo.paymentTypeData &&
									language === LANGUAGES.VI
										? extraInfo.paymentTypeData.value_vi
										: ""}
									{extraInfo &&
									extraInfo.paymentTypeData &&
									language === LANGUAGES.EN
										? extraInfo.paymentTypeData.value_en
										: ""}
								</span>
							</div>
							<div className="hide-price">
								<span onClick={() => this.showHideDetailsInfo(false)}>
									Ẩn Bảng Giá
								</span>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
