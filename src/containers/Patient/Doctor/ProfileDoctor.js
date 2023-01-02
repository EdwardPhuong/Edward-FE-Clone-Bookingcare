import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment, { lang } from "moment";
import { Link } from "react-router-dom";

import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import "./ProfileDoctor.scss";

class ProfileDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataProfile: {},
		};
	}

	async componentDidMount() {
		let data = await this.getInfoDoctor(this.props.doctorId);
		this.setState({
			dataProfile: data,
		});
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.doctorId !== this.props.doctorId) {
			let data = await this.getInfoDoctor(this.props.doctorId);
			this.setState({
				dataProfile: data,
			});
			console.log("Updated Check State: ", this.state);
		}
	}

	getInfoDoctor = async (doctorId) => {
		let result = {};
		if (doctorId) {
			let response = await userService.getProfileDoctorById(doctorId);
			if (response && response.errCode === 0) {
				result = response.data;
			}
		}
		return result;
	};

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	renderBookingTime = (dataTime) => {
		let { language } = this.props;
		if (dataTime && !_.isEmpty(dataTime)) {
			let time =
				language === LANGUAGES.VI
					? dataTime.timeTypeData.value_vi
					: dataTime.timeTypeData.value_en;
			let date =
				language === LANGUAGES.VI
					? this.capitalizeFirstLetter(
							moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
					  )
					: moment
							.unix(+dataTime.date / 1000)
							.locale("en")
							.format("ddd - MM/DD/YYYY");
			return (
				<React.Fragment>
					<div>
						{time} - {date}
					</div>
					<div>Miễn Phí Đặt Lịch</div>
				</React.Fragment>
			);
		}
		return <React.Fragment></React.Fragment>;
	};

	render() {
		console.log("Edward Check States DoctorProfile: ", this.state);
		console.log("Edward Check Props DoctorProfile: ", this.props);
		let {
			language,
			isShowDoctorDescription,
			dataScheduleTimeModal,
			isShowPrice,
			isShowLinkDetail,
			doctorId,
		} = this.props;
		let { dataProfile } = this.state;
		let nameVi = "",
			nameEn = "";
		if (dataProfile && dataProfile.positionData) {
			nameVi = `${dataProfile.positionData.value_vi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
			nameEn = `${dataProfile.positionData.value_en}, ${dataProfile.firstName} ${dataProfile.lastName}`;
		}
		return (
			<div className="doctor-profile-container">
				<div className="doctor-introduction">
					<div className="content-left">
						<img src={dataProfile && dataProfile.image ? dataProfile.image : ""} />
					</div>
					<div className="content-right">
						<div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>

						<div className="down">
							{isShowDoctorDescription === true ? (
								<React.Fragment>
									{dataProfile &&
										dataProfile.Markdown &&
										dataProfile.Markdown.description && (
											<span>{dataProfile.Markdown.description}</span>
										)}
								</React.Fragment>
							) : (
								<React.Fragment>
									{this.renderBookingTime(dataScheduleTimeModal)}
								</React.Fragment>
							)}
						</div>
					</div>
				</div>
				{isShowLinkDetail === true && (
					<div className="view-details-doctor">
						<Link to={`/details-doctor/${doctorId}`}>Xem Thêm</Link>
					</div>
				)}
				{isShowPrice === true && (
					<div className="price">
						Giá Khám:
						{dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI ? (
							<NumberFormat
								value={dataProfile.Doctor_Info.priceTypeData.value_vi}
								displayType={"text"}
								thousandSeparator={true}
								suffix={"VND"}
							/>
						) : (
							""
						)}
						{dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN ? (
							<NumberFormat
								value={dataProfile.Doctor_Info.priceTypeData.value_en}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
							/>
						) : (
							""
						)}
					</div>
				)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
