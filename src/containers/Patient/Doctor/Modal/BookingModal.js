import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../../components/Input/DatePicker";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import NumberFormat from "react-number-format";
import LoadingOverlay from "react-loading-overlay";

import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import userService from "../../../../services/userService";

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: "",
			phoneNumber: "",
			email: "",
			address: "",
			selectedGender: "",
			reason: "",
			birthday: "",
			doctorId: "",

			timeType: "",
			genders: "",
		};
	}

	async componentDidMount() {
		this.props.fetchGenderRedux();
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {
			this.setState({
				genders: this.buildGenderData(this.props.genderRedux),
			});
		}

		if (prevProps.language !== this.props.language) {
			this.setState({
				genders: this.buildGenderData(this.props.genderRedux),
			});
		}

		if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {
			let doctorId =
				this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)
					? this.props.dataScheduleTimeModal.doctorId
					: "";
			let timeType = this.props.dataScheduleTimeModal.timeType;
			this.setState({
				doctorId: doctorId,
				timeType: timeType,
			});
		}
	}

	buildGenderData = (data) => {
		let result = [];
		let language = this.props.language;
		if (data && data.length > 0) {
			data.map((item) => {
				let object = {};
				object.label = language === LANGUAGES.VI ? item.value_vi : item.value_en;
				object.value = item.keyMap;
				result.push(object);
			});
		}
		return result;
	};

	handleOnchangeInput = (event, id) => {
		let valueInput = event.target.value;
		let copyState = { ...this.state };
		copyState[id] = valueInput;
		this.setState({
			...copyState,
		});
	};

	handleOnchangeDatePicker = (date) => {
		this.setState({
			birthday: date[0],
		});
	};

	handleChangeSelect = (selectedOption) => {
		this.setState({ selectedGender: selectedOption });
	};

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	buildTimeBooking = (dataTime) => {
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
			return `${time} - ${date}`;
		}
		return "";
	};

	buildDoctorName = (dataTime) => {
		let { language } = this.props;
		if (dataTime && !_.isEmpty(dataTime)) {
			let name =
				language === LANGUAGES.VI
					? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
					: `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
			return name;
		}
		return "";
	};

	handleConfirmBooking = async () => {
		//validate input postBookAppointment
		let date = new Date(this.state.birthday).getTime();
		let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
		let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal);
		toast.warn("Sending booking details to your gmail...");

		let response = await userService.postBookAppointment({
			fullName: this.state.fullName,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email,
			address: this.state.address,
			selectedGender: this.state.selectedGender.value,
			reason: this.state.reason,
			date: this.props.dataScheduleTimeModal.date,
			birthday: date,
			doctorId: this.state.doctorId,
			timeType: this.state.timeType,
			language: this.props.language,
			timeString: timeString,
			doctorName: doctorName,
		});
		if (response && response.errCode === 0) {
			toast.success("Successfully created booking appointment !");
			this.props.closeBookingModal();
		} else {
			toast.error("Error creating booking appointment !");
		}
	};

	render() {
		let { language, isOpenModal, closeBookingModal, dataScheduleTimeModal, genderRedux } =
			this.props;
		let doctorId =
			dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)
				? dataScheduleTimeModal.doctorId
				: "";
		return (
			<React.Fragment>
				<Modal
					isOpen={isOpenModal}
					className={"booking-modal-container modal-dialog-centered"}
					size="lg"
					centered
				>
					<div className="booking-modal-content">
						<div className="booking-modal-header">
							<span className="left">Thong Tin Dat Lich</span>
							<span className="right" onClick={closeBookingModal}>
								<i className="fas fa-times"></i>
							</span>
						</div>
						<div className="booking-modal-body">
							{/* {JSON.stringify(dataScheduleTimeModal)} */}
							<div className="doctor-info">
								<ProfileDoctor
									doctorId={doctorId}
									isShowDoctorDescription={false}
									dataScheduleTimeModal={dataScheduleTimeModal}
									isShowLinkDetail={false}
									isShowPrice={true}
								/>
							</div>

							<div className="row">
								<div className="col-4 form-group">
									<label>Ho Ten</label>
									<input
										className="form-control"
										value={this.state.fullName}
										onChange={(event) =>
											this.handleOnchangeInput(event, "fullName")
										}
									/>
								</div>
								<div className="col-4 form-group">
									<label>So Dien Thoai</label>
									<input
										className="form-control"
										value={this.state.phoneNumber}
										onChange={(event) =>
											this.handleOnchangeInput(event, "phoneNumber")
										}
									/>
								</div>
								<div className="col-4 form-group">
									<label>Dia Chi Email</label>
									<input
										className="form-control"
										value={this.state.email}
										onChange={(event) =>
											this.handleOnchangeInput(event, "email")
										}
									/>
								</div>
								<div className="col-4 form-group">
									<label>Dia Chi Lien He</label>
									<input
										className="form-control"
										value={this.state.address}
										onChange={(event) =>
											this.handleOnchangeInput(event, "address")
										}
									/>
								</div>
								<div className="col-4 form-group">
									<label>Ngày Sinh</label>
									<DatePicker
										className="form-control"
										onChange={this.handleOnchangeDatePicker}
										value={this.state.birthday}
									/>
								</div>
								<div className="col-4 form-group">
									<label>Gioi Tinh</label>
									<Select
										value={this.state.selectedGender}
										options={this.state.genders}
										onChange={this.handleChangeSelect}
									/>
								</div>
								<div className="col-12 form-group">
									<label>Ly Do Kham</label>
									<input
										className="form-control"
										value={this.state.reason}
										onChange={(event) =>
											this.handleOnchangeInput(event, "reason")
										}
									/>
								</div>
							</div>
						</div>
						<div className="booking-modal-footer">
							<button
								className="btn-booking-confirm"
								onClick={() => this.handleConfirmBooking()}
							>
								Xac Nhan
							</button>
							<button className="btn-booking-cancel" onClick={closeBookingModal}>
								Huy Bo
							</button>
						</div>
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		genderRedux: state.admin.genders,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchGenderRedux: () => dispatch(actions.fetchGenderStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
