import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { userService } from "../../../services";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailsClinic.scss";
import _ from "lodash";

class DetailsClinic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctorId: [],
			dataDetailsClinic: {},
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let id = this.props.match.params.id;
			let response = await userService.getDetailsClinicById({
				id: id,
			});

			if (response && response.errCode === 0) {
				let data = response.data;
				let arrDoctorId = [];
				if (data && !_.isEmpty(response.data)) {
					let arr = data.doctorClinic;
					if (arr && arr.length > 0) {
						arr.map((item) => {
							arrDoctorId.push(item.doctorId);
						});
					}
				}
				this.setState({
					dataDetailsClinic: response.data,
					arrDoctorId: arrDoctorId,
				});
			}
		}
	}

	getdataDetailsClinic = () => {};

	async componentDidUpdate(prevProps, prevState, snapshot) {}

	render() {
		let { language } = this.props;
		let { arrDoctorId, dataDetailsClinic } = this.state;
		console.log(this.state);
		return (
			<div className="details-clinic-container">
				<HomeHeader />
				<div className="clinic-description-background">
					<div className="clinic-description">
						{dataDetailsClinic && !_.isEmpty(dataDetailsClinic) && (
							<React.Fragment>
								<div>{dataDetailsClinic.name}</div>
								<div
									dangerouslySetInnerHTML={{
										__html: dataDetailsClinic.descriptionHTML,
									}}
								></div>
							</React.Fragment>
						)}
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsClinic);
