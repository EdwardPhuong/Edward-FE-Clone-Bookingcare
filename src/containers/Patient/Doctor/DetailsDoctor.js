import React, { Component } from "react";
import { connect } from "react-redux";

import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import "./DetailsDoctor.scss";

import { userService } from "../../../services";
import { LANGUAGES } from "../../../utils";

class DetailsDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailsDoctor: {},
			currentDoctorId: -1,
		};
	}

	async componentDidMount() {
		if (this.props.match && this.props.match.params && this.props.match.params.id) {
			let doctorId = this.props.match.params.id;
			this.setState({
				currentDoctorId: doctorId,
			});

			let response = await userService.getDetailsDoctor(doctorId);
			if (response && response.errCode === 0) {
				this.setState({
					detailsDoctor: response.data,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {}

	render() {
		let { detailsDoctor } = this.state;
		let language = this.props.language;
		let nameVi = "",
			nameEn = "";
		if (detailsDoctor && detailsDoctor.positionData) {
			nameVi = `${detailsDoctor.positionData.value_vi}, ${detailsDoctor.lastName} ${detailsDoctor.firstName} `;
			nameEn = `${detailsDoctor.positionData.value_en}, ${detailsDoctor.firstName} ${detailsDoctor.lastName}`;
		}
		return (
			<React.Fragment>
				<HomeHeader isShowBanner={false} />
				<div className="details-doctor-container">
					<div className="details-doctor-header">
						<div className="doctor-introduction">
							<div className="content-left">
								<img
									src={
										detailsDoctor && detailsDoctor.image
											? detailsDoctor.image
											: ""
									}
								/>
							</div>
							<div className="content-right">
								<div className="up">
									{language === LANGUAGES.VI ? nameVi : nameEn}
								</div>

								<div className="down">
									{detailsDoctor &&
										detailsDoctor.Markdown &&
										detailsDoctor.Markdown.description && (
											<span>{detailsDoctor.Markdown.description}</span>
										)}
								</div>
							</div>
						</div>
						<div className="schedule-doctor-container">
							<div className="content-left-doctor-schedule">
								<DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
							</div>
							<div className="content-right-doctor-extra-info">
								<DoctorExtraInfo doctorIdFromParent={this.state.currentDoctorId} />
							</div>
						</div>
						<div className="doctor-appointment"></div>
					</div>
					<div className="details-doctor-body">
						<div className="doctor-details-information">
							{detailsDoctor &&
								detailsDoctor.Markdown &&
								detailsDoctor.Markdown.contentHTML && (
									<div
										dangerouslySetInnerHTML={{
											__html: detailsDoctor.Markdown.contentHTML,
										}}
									></div>
								)}
						</div>
					</div>
					<div className="details-doctor-footer"></div>

					<div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDoctor);
