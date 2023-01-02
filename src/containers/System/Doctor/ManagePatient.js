import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

import DatePicker from "../../../components/Input/DatePicker";
import userService from "../../../services/userService";
import RemedyModal from "./RemedyModal";
import { LANGUAGES } from "../../../utils";
import "./ManagePatient.scss";
import { toast } from "react-toastify";
import { getTextOfJSDocComment } from "typescript";

class ManagePatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDate: moment(new Date()).startOf("day").valueOf(),
			dataPatient: [],
			isOpenRemedyModal: false,
			dataModal: {},
			isShowLoadingOverlay: false,
		};
	}

	async componentDidMount() {
		this.getDataPatient();
	}

	async componentDidUpdate(prevProps, prevState, snapshot) {}

	handleOnchangeDatePicker = (date) => {
		this.setState({ currentDate: date[0] }, async () => {
			await this.getDataPatient();
		});
	};

	getDataPatient = async () => {
		let { user } = this.props;
		let { currentDate } = this.state;
		let formattedDate = new Date(currentDate).getTime();
		let response = await userService.getListPatientForDoctor({
			doctorId: user.id,
			date: formattedDate,
		});
		if (response && response.errCode === 0) {
			this.setState({ dataPatient: response.data });
		}
		console.log("Check res: ", response);
	};

	handleConfirm = (item) => {
		let data = {
			doctorId: item.doctorId,
			patientId: item.patientId,
			email: item.patientData.email,
			timeType: item.timeType,
			patientName: item.patientData.firstName,
		};
		this.setState({ isOpenRemedyModal: true, dataModal: data });
	};

	closeRemedyModal = () => {
		this.setState({ isOpenRemedyModal: false, dataModal: {} });
	};

	sendRemedy = async (dataFromSendRemedyModal) => {
		let { dataModal } = this.state;
		this.setState({ isShowLoadingOverlay: true });
		let response = await userService.sendRemedy({
			email: dataFromSendRemedyModal.email,
			imgBase64: dataFromSendRemedyModal.imgBase64,
			doctorId: dataModal.doctorId,
			patientId: dataModal.patientId,
			timeType: dataModal.timeType,
			language: this.props.language,
			patientName: dataModal.patientName,
		});
		if (response && response.errCode === 0) {
			this.setState({ isShowLoadingOverlay: false });
			toast.success("Successfully send remedy to patient !");
			this.getDataPatient();
			this.closeRemedyModal();
		} else {
			this.setState({ isShowLoadingOverlay: false });
			toast.error("Something went wrong !");
			console.log("Error sendRemedy: ", response);
		}
	};

	render() {
		let { language, user } = this.props;
		let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
		return (
			<React.Fragment>
				<LoadingOverlay
					active={this.state.isShowLoadingOverlay}
					spinner
					text="Sending Remedy To Patient..."
				>
					<div className="manage-patient-container">
						<div className="mp-title">Quản Lý Bệnh Nhân Khám Bệnh</div>
						<div className="mp-body row">
							<div className="col-4 form-group">
								<label>Chọn Ngày Khám</label>
								<DatePicker
									onChange={this.handleOnchangeDatePicker}
									className="form-control"
									value={this.state.currentDate}
								/>
							</div>
							<div className="col-12 tb-manage-patient">
								<table style={{ width: "100%" }}>
									<thead>
										<tr>
											<th>STT</th>
											<th>Thoi Gian</th>
											<th>Ho Va Ten</th>
											<th>Gioi Tinh</th>
											<th>So Dien Thoai</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{dataPatient && dataPatient.length > 0 ? (
											dataPatient.map((item, index) => {
												let gender =
													language === LANGUAGES.VI
														? item.patientData.genderData.value_vi
														: item.patientData.genderData.value_en;
												let time =
													language === LANGUAGES.VI
														? item.timeTypeDataPatient.value_vi
														: item.timeTypeDataPatient.value_en;
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{time}</td>
														<td>{item.patientData.firstName}</td>
														<td>{gender}</td>
														<td>{item.patientData.phoneNumber}</td>
														<td>
															<button
																className="mp-btn-confirm"
																onClick={() =>
																	this.handleConfirm(item)
																}
															>
																Xac Nhan
															</button>
														</td>
													</tr>
												);
											})
										) : (
											<tr>
												<td colSpan="6" style={{ textAlign: "center" }}>
													No Data
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<RemedyModal
						isOpenModal={isOpenRemedyModal}
						dataModal={dataModal}
						closeRemedyModal={this.closeRemedyModal}
						sendRemedy={this.sendRemedy}
					/>
				</LoadingOverlay>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		user: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
