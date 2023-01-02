import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";

import "./ManageSchedule.scss";
import * as action from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import userService from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";

class ManageSchedule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			listDoctors: [],
			selectedDoctor: {},
			currentDate: "",
			timeRange: [],
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctorRedux();
		this.props.fetchAllCodeScheduleTimeRedux();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
			this.setState({
				listDoctors: dataSelect,
			});
		}

		if (prevProps.allScheduleTimeRedux !== this.props.allScheduleTimeRedux) {
			let data = this.props.allScheduleTimeRedux;
			if (data && data.length > 0) {
				data = data.map((item) => ({ ...item, isSelected: false }));
			}
			this.setState({
				timeRange: data,
			});
		}
	}

	buildDataInputSelect = (inputData) => {
		let result = [];
		let language = this.props.language;
		if (inputData && inputData.length > 0) {
			inputData.map((doctor, index) => {
				let object = {};
				let labelVi = `${doctor.lastName} ${doctor.firstName}`;
				let labelEn = `${doctor.firstName} ${doctor.lastName}`;
				object.label = language === LANGUAGES.VI ? labelVi : labelEn;
				object.value = doctor.id;
				result.push(object);
			});
		}
		return result;
	};

	handleChangeSelectDoctor = async (selectedDoctor) => {
		this.setState({ selectedDoctor });
	};

	handleOnchangeDatePicker = (date) => {
		this.setState({ currentDate: date[0] });
	};

	handleClickButtonTime = (time) => {
		let { timeRange } = this.state;
		if (timeRange && timeRange.length > 0) {
			timeRange = timeRange.map((item) => {
				if (item.id === time.id) item.isSelected = !item.isSelected;
				return item;
			});
			this.setState({
				timeRange: timeRange,
			});
		}
	};

	handleSaveSchedule = async () => {
		let { timeRange, selectedDoctor, currentDate } = this.state;
		let result = [];
		if (selectedDoctor && _.isEmpty(selectedDoctor)) {
			toast.error("Please select a Doctor");
			return;
		}

		if (!currentDate) {
			toast.error("Please select a Date !");
			return;
		}

		let formattedDate = new Date(currentDate).getTime();

		if (timeRange && timeRange.length > 0) {
			let selectedTime = timeRange.filter((item) => item.isSelected === true);
			if (selectedTime && selectedTime.length > 0) {
				selectedTime.map((time) => {
					let object = {};
					object.doctorId = selectedDoctor.value;
					object.date = formattedDate;
					object.timeType = time.keyMap;
					result.push(object);
				});
			} else {
				toast.error("Please select a Date !");
				return;
			}
		}

		let res = await userService.saveBulkScheduledDoctor({
			arrSchedule: result,
			doctorId: selectedDoctor.value,
			date: formattedDate,
		});

		if (res && res.errCode === 0) {
			toast.success("Successfully Create Working Schedule For Doctor !");
		} else {
			toast.error("Error Unsuccessfully !");
			console.log("Error saveBulkScheduledDoctor API Error: ", res);
		}
	};

	render() {
		let { listDoctors, selectedDoctor, timeRange } = this.state;
		let { language } = this.props;
		let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

		return (
			<div className="manage-schedule-container">
				<div className="manage-schedule-title">
					<FormattedMessage id="manage-schedule.title" />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-6 form-group">
							<label>
								<FormattedMessage id="manage-schedule.choose-doctor" />
							</label>
							<Select
								value={selectedDoctor}
								onChange={this.handleChangeSelectDoctor}
								options={listDoctors}
							/>
						</div>
						<div className="col-6 form-group">
							<label>
								<FormattedMessage id="manage-schedule.choose-date" />
							</label>
							<DatePicker
								onChange={this.handleOnchangeDatePicker}
								className="form-control"
								value={this.state.currentDate}
								minDate={yesterday}
							/>
						</div>
						<div className="col-12 pick-hours-container">
							{timeRange &&
								timeRange.length > 0 &&
								timeRange.map((time, index) => {
									return (
										<button
											className={
												time.isSelected === true
													? "btn btn-schedule active"
													: "btn btn-schedule hover"
											}
											key={index}
											onClick={() => this.handleClickButtonTime(time)}
										>
											{language === LANGUAGES.VI
												? time.value_vi
												: time.value_en}
										</button>
									);
								})}
						</div>
						<div className="col-12">
							<div
								className="btn btn-primary btn-save-schedule"
								onClick={() => this.handleSaveSchedule()}
							>
								<FormattedMessage id="manage-schedule.save" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		allDoctorsRedux: state.admin.allDoctors,
		language: state.app.language,
		allScheduleTimeRedux: state.admin.allScheduleTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
		fetchAllCodeScheduleTimeRedux: () => dispatch(action.fetchAllCodeScheduleTime()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
