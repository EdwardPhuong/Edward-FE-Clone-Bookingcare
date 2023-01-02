import actionTypes from "./actionTypes";
import userService from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_GENDER_START,
			});

			let response = await userService.getAllCodeService("GENDER");
			if (response && response.errCode === 0) {
				dispatch(fetchGenderSuccess(response.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
			console.log("fetchGenderStart Error: ", e);
		}
	};
};

export const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData,
});

export const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
	type: actionTypes.FETCH_POSITION_SUCCESS,
	data: positionData,
});

export const fetchPositionFailed = () => ({
	type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData,
});

export const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.getAllCodeService("POSITION");
			if (response && response.errCode === 0) {
				dispatch(fetchPositionSuccess(response.data));
			} else {
				dispatch(fetchPositionFailed());
			}
		} catch (e) {
			dispatch(fetchPositionFailed());
			console.log("fetchGenderStart Error: ", e);
		}
	};
};

export const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.getAllCodeService("ROLE");
			if (response && response.errCode === 0) {
				dispatch(fetchRoleSuccess(response.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (e) {
			dispatch(fetchRoleFailed());
			console.log("fetchGenderStart Error: ", e);
		}
	};
};

export const createNewUser = (newUser) => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.createNewUser(newUser);
			console.log("Edward Check Create User Redux: ", response);
			if (response && response.errCode === 0) {
				toast.success("Successfully Create A New User !");
				dispatch(createNewUserSuccess());
				dispatch(fetchAllUserStart());
			} else {
				dispatch(createNewUserFailed());
				toast.error("Creating User Unsuccessfully !");
			}
		} catch (e) {
			dispatch(createNewUserFailed());
			console.log("createNewUserFailed: ", e);
		}
	};
};

export const createNewUserSuccess = () => ({
	type: actionTypes.CREATE_NEW_USER_SUCCESS,
});

export const createNewUserFailed = () => ({
	type: actionTypes.CREATE_NEW_USER_FAILED,
});

export const fetchAllUserStart = () => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.getAllUsers("ALL");
			if (response && response.errCode === 0) {
				dispatch(fetchAllUserSuccess(response.users.reverse()));
			} else {
				toast.error("Deleting User Unsuccessfully !");
				dispatch(fetchAllUserFailed());
			}
		} catch (e) {
			dispatch(fetchAllUserFailed());
			console.log("Redux Check fetchAllUserFailed Error: ", e);
		}
	};
};

export const fetchAllUserSuccess = (users) => ({
	type: actionTypes.FETCH_ALL_USER_SUCCESS,
	users: users,
});

export const fetchAllUserFailed = () => ({
	type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.deleteUser(userId);
			console.log("Edward Check Delete User Redux: ", response);
			if (response && response.errCode === 0) {
				toast.success("Successfully Delete User !");
				dispatch(deleteUserSuccess());
				dispatch(fetchAllUserStart());
			} else {
				toast.error("Deleting User Unsuccessfully !");
				dispatch(deleteUserFailed());
			}
		} catch (e) {
			dispatch(deleteUserFailed());
			console.log("deleteUserFailed: ", e);
		}
	};
};

export const deleteUserSuccess = () => ({
	type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
	type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (user) => {
	return async (dispatch, getState) => {
		try {
			let response = await userService.editUserService(user);
			console.log("Edward Check Edit User Redux: ", response);
			if (response && response.errCode === 0) {
				toast.success("Successfully Update User's Details !");
				dispatch(fetchAllUserStart());
				dispatch(editUserSuccess());
			} else {
				toast.error("Update User's Details Unsuccessfully !");
				dispatch(editUserFailed());
			}
		} catch (e) {
			dispatch(editUserFailed());
			console.log("editUserFailed: ", e);
		}
	};
};

export const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
	return async (dispatch, getState) => {
		try {
			let topDoctorResponse = await userService.getTopDoctorHomeService("");
			if (topDoctorResponse && topDoctorResponse.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
					topDoctorsData: topDoctorResponse.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
				});
			}
		} catch (e) {
			console.log("fetchTopDoctor: ", e);
			dispatch({
				type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
			});
		}
	};
};

export const fetchAllDoctor = () => {
	return async (dispatch, getState) => {
		try {
			let allDoctorResponse = await userService.getAllDoctor();
			if (allDoctorResponse && allDoctorResponse.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
					allDoctorData: allDoctorResponse.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
				});
			}
		} catch (e) {
			console.log("fetchallDoctor: ", e);
			dispatch({
				type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
			});
		}
	};
};

export const saveDetailsDoctor = (inputData) => {
	return async (dispatch, getState) => {
		try {
			let saveDetailsDoctorResponse = await userService.saveDetailsDoctor(inputData);
			if (saveDetailsDoctorResponse && saveDetailsDoctorResponse.errCode === 0) {
				toast.success("Successfully Save Details Doctor !");
				dispatch({
					type: actionTypes.SAVE_DETAILS_DOCTOR_SUCCESS,
				});
			} else {
				toast.error("Save Details Doctor Unsuccessfully  !");
				dispatch({
					type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED,
				});
			}
		} catch (e) {
			toast.error("Save Details Doctor Unsuccessfully  !");
			console.log("saveDetailsDoctor: ", e);
			dispatch({
				type: actionTypes.SAVE_DETAILS_DOCTOR_FAILED,
			});
		}
	};
};

export const fetchAllCodeScheduleTime = () => {
	return async (dispatch, getState) => {
		try {
			let dataTimeResponse = await userService.getAllCodeService("TIME");
			if (dataTimeResponse && dataTimeResponse.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
					dataTime: dataTimeResponse.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
				});
			}
		} catch (e) {
			console.log("fetchallDoctor: ", e);
			dispatch({
				type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
			});
		}
	};
};

export const getRequireDoctorInfo = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_DOCTOR_INFO_START,
			});

			let responsePrice = await userService.getAllCodeService("PRICE");
			let responsePayment = await userService.getAllCodeService("PAYMENT");
			let responseProvince = await userService.getAllCodeService("PROVINCE");
			let responseSpecialty = await userService.getAllSpecialty();
			let responseClinic = await userService.getAllClinic();

			if (
				responsePrice &&
				responsePrice.errCode === 0 &&
				responsePayment &&
				responsePayment.errCode === 0 &&
				responseProvince &&
				responseProvince.errCode === 0 &&
				responseSpecialty &&
				responseSpecialty.errCode === 0 &&
				responseClinic &&
				responseClinic.errCode === 0
			) {
				let doctorInfoData = {
					responsePrice: responsePrice.data,
					responsePayment: responsePayment.data,
					responseProvince: responseProvince.data,
					responseSpecialty: responseSpecialty.data,
					responseClinic: responseClinic.data,
				};
				dispatch(getRequireDoctorSuccess(doctorInfoData));
			} else {
				dispatch(getRequireDoctorFailed());
			}
		} catch (e) {
			dispatch(getRequireDoctorFailed());
			console.log("getRequireDoctorStart Error: ", e);
		}
	};
};

export const getRequireDoctorSuccess = (doctorInfoData) => ({
	type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
	data: doctorInfoData,
});

export const getRequireDoctorFailed = () => ({
	type: actionTypes.FETCH_DOCTOR_INFO_FAILED,
});
