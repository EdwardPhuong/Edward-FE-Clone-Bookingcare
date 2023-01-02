import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios";

const userService = {
	handleLoginApi(userEmail, userPassword) {
		return axios.post("/api/login", {
			email: userEmail,
			password: userPassword,
		});
	},

	getAllUsers(inputId) {
		//template string
		return axios.get(`/api/get-all-users?id=${inputId}`);
	},

	createNewUser(data) {
		return axios.post("/api/create-new-user", data);
	},

	deleteUser(userId) {
		return axios.delete("/api/delete-user", { data: { id: userId } });
	},

	editUserService(inputData) {
		return axios.put("/api/edit-user", inputData);
	},

	getAllCodeService(inputData) {
		return axios.get(`/api/get-allcode?type=${inputData}`);
	},

	getTopDoctorHomeService(limitInput) {
		return axios.get(`/api/top-doctor-home?limit=${limitInput}`);
	},

	getAllDoctor() {
		return axios.get("/api/get-all-doctor");
	},

	saveDetailsDoctor(inputData) {
		return axios.post("/api/save-info-doctor", inputData);
	},

	getDetailsDoctor(doctorId) {
		return axios.get(`/api/get-details-doctor-by-id?id=${doctorId}`);
	},

	saveBulkScheduledDoctor(inputData) {
		return axios.post("/api/bulk-create-schedule", inputData);
	},

	getScheduleDoctorByDate(doctorId, date) {
		return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
	},

	getExtraInfoDoctorById(doctorId) {
		return axios.get(`api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
	},

	getProfileDoctorById(doctorId) {
		return axios.get(`api/get-profile-doctor-by-id?doctorId=${doctorId}`);
	},

	postBookAppointment(inputData) {
		return axios.post("/api/patient-book-appointment", inputData);
	},

	postVerifyBookAppointment(inputData) {
		return axios.post("/api/verify-book-appointment", inputData);
	},

	createNewSpecialty(inputData) {
		return axios.post("/api/create-new-specialty", inputData);
	},

	getAllSpecialty() {
		return axios.get("/api/get-all-specialty");
	},

	getDetailsSpecialtyById(inputData) {
		return axios.get(
			`/api/get-details-specialty-by-id?id=${inputData.id}&location=${inputData.location}`,
			inputData
		);
	},

	createNewClinic(inputData) {
		return axios.post("/api/create-new-clinic", inputData);
	},

	getAllClinic() {
		return axios.get("/api/get-all-clinic");
	},

	getDetailsClinicById(inputId) {
		return axios.get(`/api/get-details-clinic-by-id?id=${inputId.id}`);
	},

	getListPatientForDoctor(inputData) {
		return axios.get(
			`/api/get-list-patient-for-doctor?doctorId=${inputData.doctorId}&date=${inputData.date}`
		);
	},

	sendRemedy(inputData) {
		return axios.post("/api/send-remedy", inputData);
	},
};

export default userService;
