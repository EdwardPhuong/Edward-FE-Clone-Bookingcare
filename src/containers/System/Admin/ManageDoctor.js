import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import Select from "react-select";

import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./TableManageUser.scss";
import * as action from "../../../store/actions";
import "./ManageDoctor.scss";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import userService from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//save to markdown table
			contentMarkdown: "",
			contentHTML: "",
			description: "",
			listDoctors: [],
			selectedDoctor: "",

			//save to doctor_info table
			listPrice: [],
			listPayment: [],
			listProvince: [],
			listClinic: [],
			listSpecialty: [],

			selectedPrice: "",
			selectedPayment: "",
			selectedProvince: "",
			selectedClinic: "",
			selectedSpecialty: "",

			nameClinic: "",
			addressClinic: "",
			note: "",
			clinicId: "",
			specialtyId: "",

			//others
			hasOldData: false,
		};
	}

	componentDidMount() {
		this.props.fetchAllDoctorRedux();
		this.props.getRequireDoctorInfoRedux();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, "DOCTOR");
			this.setState({
				listDoctors: dataSelect,
			});
		}

		if (prevProps.language !== this.props.language) {
			let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux, "DOCTOR");
			this.setState({
				listDoctors: dataSelect,
			});
		}

		if (prevProps.doctorInfoDataRedux !== this.props.doctorInfoDataRedux) {
			let {
				responsePrice,
				responsePayment,
				responseProvince,
				responseSpecialty,
				responseClinic,
			} = this.props.doctorInfoDataRedux;
			let dataSelectPrice = this.buildDataInputSelect(responsePrice);
			let dataSelectPayment = this.buildDataInputSelect(responsePayment);
			let dataSelectProvince = this.buildDataInputSelect(responseProvince);
			let dataSelectSpecialty = this.buildDataInputSelect(responseSpecialty, "SPECIALTY");
			let dataSelectClinic = this.buildDataInputSelect(responseClinic, "CLINIC");
			this.setState({
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
				listSpecialty: dataSelectSpecialty,
				listClinic: dataSelectClinic,
			});
		}

		if (prevProps.language !== this.props.language) {
			let { responsePrice, responsePayment, responseProvince } =
				this.props.doctorInfoDataRedux;
			let dataSelectPrice = this.buildDataInputSelect(responsePrice);
			let dataSelectPayment = this.buildDataInputSelect(responsePayment);
			let dataSelectProvince = this.buildDataInputSelect(responseProvince);

			// let { selectedPrice } = this.state;
			// dataSelectPrice.map((item, index) => {
			// 	if (selectedPrice.value === item.value) {
			// 		this.setState({
			// 			selectedPrice: item,
			// 		});
			// 	}
			// });
			this.setState({
				listPrice: dataSelectPrice,
				listPayment: dataSelectPayment,
				listProvince: dataSelectProvince,
			});
		}
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({
			contentHTML: html,
			contentMarkdown: text,
		});
	};

	handleSaveContentMarkdown = () => {
		let { hasOldData } = this.state;
		this.props.saveDetailsDoctorRedux({
			contentHTML: this.state.contentHTML,
			contentMarkdown: this.state.contentMarkdown,
			description: this.state.description,
			doctorId: this.state.selectedDoctor.value,
			action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

			nameClinic: this.state.nameClinic,
			addressClinic: this.state.addressClinic,
			note: this.state.note,

			selectedPrice:
				this.state.selectedPrice && this.state.selectedPrice.value
					? this.state.selectedPrice.value
					: "",
			selectedPayment:
				this.state.selectedPayment && this.state.selectedPayment.value
					? this.state.selectedPayment.value
					: "",
			selectedProvince:
				this.state.selectedProvince && this.state.selectedProvince.value
					? this.state.selectedProvince.value
					: "",
			clinicId:
				this.state.selectedClinic && this.state.selectedClinic.value
					? this.state.selectedClinic.value
					: "",
			specialtyId:
				this.state.selectedSpecialty && this.state.selectedSpecialty.value
					? this.state.selectedSpecialty.value
					: "",
		});
	};

	handleChangeSelectDoctor = async (selectedDoctor) => {
		this.setState({ selectedDoctor });
		let { listPrice, listProvince, listPayment, listSpecialty, listClinic } = this.state;
		let response = await userService.getDetailsDoctor(selectedDoctor.value);
		if (response && response.errCode === 0 && response.data && response.data.Markdown) {
			let markdown = response.data.Markdown;
			let addressClinic = "",
				nameClinic = "",
				note = "",
				priceId = "",
				provinceId = "",
				paymentId = "",
				specialtyId = "",
				clinicId = "",
				selectedClinic = "",
				selectedPayment = "",
				selectedPrice = "",
				selectedProvince = "",
				selectedSpecialty = "";

			if (response.data.Doctor_Info) {
				addressClinic = response.data.Doctor_Info.addressClinic;
				nameClinic = response.data.Doctor_Info.nameClinic;
				note = response.data.Doctor_Info.note;

				clinicId = response.data.Doctor_Info.clinicId;
				priceId = response.data.Doctor_Info.priceId;
				provinceId = response.data.Doctor_Info.provinceId;
				paymentId = response.data.Doctor_Info.paymentId;
				specialtyId = response.data.Doctor_Info.specialtyId;

				selectedPayment = listPayment.find((item) => {
					return item && item.value === paymentId;
				});
				selectedPrice = listPrice.find((item) => {
					return item && item.value === priceId;
				});
				selectedProvince = listProvince.find((item) => {
					return item && item.value === provinceId;
				});
				selectedSpecialty = listSpecialty.find((item) => {
					return item && item.value === specialtyId;
				});
				selectedClinic = listClinic.find((item) => {
					return item && item.value === clinicId;
				});
			}
			this.setState({
				contentHTML: markdown.contentHTML,
				contentMarkdown: markdown.contentMarkdown,
				description: markdown.description,
				hasOldData: true,
				addressClinic: addressClinic,
				nameClinic: nameClinic,
				note: note,

				selectedPayment: selectedPayment,
				selectedPrice: selectedPrice,
				selectedProvince: selectedProvince,
				selectedSpecialty: selectedSpecialty,
				selectedClinic: selectedClinic,
			});
		} else {
			this.setState({
				contentHTML: "",
				contentMarkdown: "",
				description: "",
				hasOldData: false,
				addressClinic: "",
				nameClinic: "",
				note: "",
				selectedPayment: "",
				selectedPrice: "",
				selectedProvince: "",
				selectedSpecialty: "",
				selectedClinic: "",
			});
		}
	};

	handleChangeSelectDoctorInfo = async (selectedValue, name) => {
		let stateName = name.name;
		let stateCopy = { ...this.state };
		stateCopy[stateName] = selectedValue;
		this.setState({ ...stateCopy });
	};

	handleOnChangeText = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	buildDataInputSelect = (inputData, type) => {
		let result = [];
		let language = this.props.language;
		if (inputData && inputData.length > 0) {
			if (type === "SPECIALTY" || type === "CLINIC") {
				inputData.map((item, index) => {
					let object = {};
					object.label = item.name;
					object.value = item.id;
					result.push(object);
				});
			} else {
				inputData.map((item, index) => {
					let object = {};
					let labelVi =
						type === "DOCTOR" ? `${item.lastName} ${item.firstName}` : item.value_vi;
					let labelEn =
						type === "DOCTOR" ? `${item.firstName} ${item.lastName}` : item.value_en;
					object.label = language === LANGUAGES.VI ? labelVi : labelEn;
					object.value = type === "DOCTOR" ? item.id : item.keyMap;
					result.push(object);
				});
			}
		}
		return result;
	};

	render() {
		let {
			listDoctors,
			listPrice,
			listPayment,
			listProvince,
			listSpecialty,
			listClinic,
			hasOldData,

			selectedDoctor,
			selectedPrice,
			selectedPayment,
			selectedProvince,
			selectedSpecialty,
			selectedClinic,
		} = this.state;
		return (
			<div className="manage-doctor-container">
				<div className="manage-doctor-title">Doctor Title</div>
				<div className="more-info">
					<div className="content-left form-group">
						<label>Chọn Bác Sĩ</label>
						<Select
							value={selectedDoctor}
							onChange={this.handleChangeSelectDoctor}
							options={listDoctors}
							placeholder={"Chọn Bác Sĩ..."}
						/>
					</div>
					<div className="content-right">
						<label>Thông Tin Giới Thiệu</label>
						<textarea
							className="form-control"
							onChange={(event) => this.handleOnChangeText(event, "description")}
							value={this.state.description}
						></textarea>
					</div>
				</div>

				<div className="doctor-details row">
					<div className="col-4 form-group">
						<label>Chọn Giá</label>
						<Select
							value={selectedPrice}
							onChange={this.handleChangeSelectDoctorInfo}
							options={listPrice}
							placeholder={"Chọn Giá..."}
							name={"selectedPrice"}
						/>
					</div>

					<div className="col-4 form-group">
						<label>Chọn Phương Thức Thanh Toán</label>
						<Select
							value={selectedPayment}
							onChange={this.handleChangeSelectDoctorInfo}
							options={listPayment}
							placeholder={"Chọn Phương Thức Thanh Toán..."}
							name={"selectedPayment"}
						/>
					</div>

					<div className="col-4 form-group">
						<label>Chọn Tỉnh Thành</label>
						<Select
							value={selectedProvince}
							onChange={this.handleChangeSelectDoctorInfo}
							options={listProvince}
							placeholder={"Chọn Tỉnh Thành..."}
							name={"selectedProvince"}
						/>
					</div>

					<div className="col-4 form-group">
						<label>Tên Phòng Khám</label>
						<input
							className="form-control"
							onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
							value={this.state.nameClinic}
						/>
					</div>

					<div className="col-4 form-group">
						<label>Địa Chỉ Phòng Khám</label>
						<input
							className="form-control"
							onChange={(event) => this.handleOnChangeText(event, "addressClinic")}
							value={this.state.addressClinic}
						/>
					</div>

					<div className="col-4 form-group">
						<label>Note</label>
						<input
							className="form-control"
							onChange={(event) => this.handleOnChangeText(event, "note")}
							value={this.state.note}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-4 form-group">
						<label>Chọn Chuyên Khoa</label>
						<Select
							value={selectedSpecialty}
							onChange={this.handleChangeSelectDoctorInfo}
							options={listSpecialty}
							placeholder={"Chọn Chuyên Khoa..."}
							name={"selectedSpecialty"}
						/>
					</div>
					<div className="col-4 form-group">
						<label>Chọn Phòng Khám</label>
						<Select
							value={selectedClinic}
							onChange={this.handleChangeSelectDoctorInfo}
							options={listClinic}
							placeholder={"Chọn Chuyên Khoa..."}
							name={"selectedClinic"}
						/>
					</div>
				</div>

				<div className="manage-doctor-editor">
					<MdEditor
						style={{ height: "300px" }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.contentMarkdown}
					/>
				</div>
				<button
					className={
						hasOldData === false ? "create-doctor-content" : "save-doctor-content"
					}
					onClick={() => this.handleSaveContentMarkdown()}
				>
					{hasOldData === false ? <span>Tạo Thông Tin</span> : <span>Lưu Thông Tin</span>}
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allDoctorsRedux: state.admin.allDoctors,
		doctorInfoDataRedux: state.admin.doctorInfoData,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(action.fetchAllUserStart()),
		fetchAllDoctorRedux: () => dispatch(action.fetchAllDoctor()),
		saveDetailsDoctorRedux: (inputData) => dispatch(action.saveDetailsDoctor(inputData)),
		getRequireDoctorInfoRedux: () => dispatch(action.getRequireDoctorInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
