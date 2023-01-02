import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { userService } from "../../../services";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailsSpecialty.scss";
import _ from "lodash";
import LoadingOverlay from "react-loading-overlay";

class DetailsSpecialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctorId: [],
			dataDetailsSpecialty: {},
			listProvince: [],
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			let response = await userService.getDetailsSpecialtyById({
				id: id,
				location: "ALL",
			});
			let responseProvince = await userService.getAllCodeService("PROVINCE");

			if (response && response.errCode === 0 && responseProvince.errCode === 0) {
				let data = response.data;
				let arrDoctorId = [];
				if (data && !_.isEmpty(response.data)) {
					let arr = data.doctorSpecialty;
					if (arr && arr.length > 0) {
						arr.map((item) => {
							arrDoctorId.push(item.doctorId);
						});
					}
				}
				let dataProvince = responseProvince.data;
				if (dataProvince && dataProvince.length > 0) {
					dataProvince.unshift({
						createdAt: null,
						keyMap: "ALL",
						type: "PROVINCE",
						value_vi: "Toàn Quốc",
						value_en: "All",
					});
				}
				this.setState({
					dataDetailsSpecialty: response.data,
					arrDoctorId: arrDoctorId,
					listProvince: dataProvince ? dataProvince : "",
				});
			}
		}
	}

	getDataDetailsSpecialty = () => {};

	async componentDidUpdate(prevProps, prevState, snapshot) {}

	handleOnChangeSelectProvince = async (event) => {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			let location = event.target.value;

			let response = await userService.getDetailsSpecialtyById({
				id: id,
				location: location,
			});
			if (response && response.errCode === 0) {
				let data = response.data;
				let arrDoctorId = [];
				if (data && !_.isEmpty(response.data)) {
					let arr = data.doctorSpecialty;
					if (arr && arr.length > 0) {
						arr.map((item) => {
							arrDoctorId.push(item.doctorId);
						});
					}
				}

				this.setState({
					dataDetailsSpecialty: response.data,
					arrDoctorId: arrDoctorId,
				});
			}
		}
	};

	render() {
		let { language } = this.props;
		let { arrDoctorId, dataDetailsSpecialty, listProvince } = this.state;
		console.log(this.state);
		return (
			<div className="details-specialty-container">
				<HomeHeader />
				<div className="specialty-description-background">
					<div className="specialty-description">
						{dataDetailsSpecialty && !_.isEmpty(dataDetailsSpecialty) && (
							<div
								dangerouslySetInnerHTML={{
									__html: dataDetailsSpecialty.descriptionHTML,
								}}
							></div>
						)}
					</div>
				</div>
				<div className="search-doctor-location">
					<select onChange={(event) => this.handleOnChangeSelectProvince(event)}>
						{listProvince &&
							listProvince.length > 0 &&
							listProvince.map((item, index) => {
								return (
									<option key={index} value={item.keyMap}>
										{language === LANGUAGES.VI ? item.value_vi : item.value_en}
									</option>
								);
							})}
					</select>
				</div>

				{arrDoctorId &&
					arrDoctorId.length > 0 &&
					arrDoctorId.map((item, index) => {
						return (
							<div className="each-doctor" key={index}>
								<div className="dt-content-left">
									<div className="profile-doctor">
										<ProfileDoctor
											doctorId={item}
											isShowDoctorDescription={true}
											isShowLinkDetail={true}
											isShowPrice={false}
										/>
									</div>
								</div>
								<div className="dt-content-right">
									<div className="doctor-schedule">
										<DoctorSchedule doctorIdFromParent={item} />
									</div>
									<div className="doctor-extra-info">
										<DoctorExtraInfo doctorIdFromParent={item} />
									</div>
								</div>
							</div>
						);
					})}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSpecialty);
