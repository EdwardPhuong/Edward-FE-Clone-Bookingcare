import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";

import { userService } from "../../../services";
import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";
import "./DoctorSchedule.scss";

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allDays: [],
			allAvailableTime: [],
			dataScheduleTimeModal: {},
			isOpenBookingModal: false,
		};
	}

	async componentDidMount() {
		let { language } = this.props;
		let allDays = this.getArrDays(language);
		if (this.props.doctorIdFromParent) {
			let response = await userService.getScheduleDoctorByDate(
				this.props.doctorIdFromParent,
				allDays[0].value
			);
			this.setState({
				allAvailableTime: response.data ? response.data : [],
			});
		}
		this.setState({
			allDays: allDays,
		});
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.language !== prevProps.language) {
			let allDays = this.getArrDays(this.props.language);
			this.setState({ allDays: allDays });
		}

		if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
			let allDays = this.getArrDays(this.props.language);
			let response = await userService.getScheduleDoctorByDate(
				this.props.doctorIdFromParent,
				allDays[0].value
			);
			this.setState({
				allAvailableTime: response.data ? response.data : [],
			});
		}
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	getArrDays = (language) => {
		let allDays = [];
		for (let i = 0; i < 7; i++) {
			let object = {};
			if (language === LANGUAGES.VI) {
				if (i === 0) {
					let DDMM = moment(new Date()).add(i, "days").format("DD/MM");
					let today = `Hôm nay - ${DDMM}`;
					object.label = today;
				} else {
					let labelvi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
					object.label = this.capitalizeFirstLetter(labelvi);
				}
			} else {
				if (i === 0) {
					let DDMM = moment(new Date()).add(i, "days").format("DD/MM");
					let today = `Today - ${DDMM}`;
					object.label = today;
				} else {
					object.label = moment(new Date())
						.add(i, "days")
						.locale("en")
						.format("ddd - DD/MM");
				}
			}
			object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
			allDays.push(object);
		}
		return allDays;
	};

	handleOnChangeSelect = async (event) => {
		if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
			let doctorId = this.props.doctorIdFromParent;
			let date = event.target.value;

			let response = await userService.getScheduleDoctorByDate(doctorId, date);
			if (response && response.errCode === 0) {
				this.setState({
					allAvailableTime: response.data ? response.data : [],
				});
			}
		}
	};

	handleClickScheduleTime = (time) => {
		this.setState({
			isOpenBookingModal: true,
			dataScheduleTimeModal: time,
		});
		console.log("Edward Check: ", time);
	};

	closeBookingModal = () => {
		this.setState({ isOpenBookingModal: false });
	};

	render() {
		let { allDays, allAvailableTime, dataScheduleTimeModal } = this.state;
		let { language } = this.props;

		return (
			<React.Fragment>
				<div className="doctor-schedule-container">
					<div className="doctor-schedule-header">
						<select onChange={(event) => this.handleOnChangeSelect(event)}>
							{allDays &&
								allDays.length > 0 &&
								allDays.map((item, index) => {
									return (
										<option key={index} value={item.value}>
											{item.label}
										</option>
									);
								})}
						</select>
					</div>
					<div className="all-available-time">
						<div className="calendar-icon-text">
							<i className="fas fa-calendar-alt"></i>
							<span>
								<FormattedMessage id="manage-schedule.schedule" />
							</span>
						</div>
						<div className="available-time">
							{allAvailableTime && allAvailableTime.length > 0 ? (
								<React.Fragment>
									<div className="available-time-button">
										{allAvailableTime.map((item, index) => {
											let timeDisplay =
												language === LANGUAGES.VI
													? item.timeTypeData.value_vi
													: item.timeTypeData.value_en;
											return (
												<button
													key={index}
													className={
														language === LANGUAGES.VI
															? "btn-vi"
															: "btn-en"
													}
													onClick={() =>
														this.handleClickScheduleTime(item)
													}
												>
													{timeDisplay}
												</button>
											);
										})}
									</div>
									<div className="book-free">
										<span>Chọn Và Đặt Lịch Miễn Phí</span>
										<i className="far fa-hand-point-up" />
									</div>
								</React.Fragment>
							) : (
								<div>
									<FormattedMessage id="manage-schedule.no-appointment" />
								</div>
							)}
						</div>
					</div>
				</div>
				<BookingModal
					isOpenModal={this.state.isOpenBookingModal}
					closeBookingModal={this.closeBookingModal}
					dataScheduleTimeModal={dataScheduleTimeModal}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

// {
// 	/* <Select options={options} /> */
// }
