import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
	isOpen: false,
	messageId: "",
	handleFunc: null,
	dataFunc: null,
};

const initialState = {
	genders: [],
	roles: [],
	position: [],
	listUser: [],
	topDoctors: [],
	allDoctors: [],
	allScheduleTime: [],
	doctorInfoData: [],
	isLoadingGender: false,
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GENDER_START:
			var copyState = { ...state };
			copyState.isLoadingGender = true;
			console.log("Fire Actions: fetchGenderStart", copyState);
			return {
				...copyState,
			};

		case actionTypes.FETCH_GENDER_SUCCESS:
			var copyState = { ...state };
			copyState.genders = action.data;
			copyState.isLoadingGender = false;
			console.log("Fire Actions: fetchGenderSuccess", copyState);
			return {
				...copyState,
			};

		case actionTypes.FETCH_GENDER_FAILED:
			var copyState = { ...state };
			copyState.genders = [];
			copyState.isLoadingGender = false;
			return {
				...copyState,
			};

		case actionTypes.FETCH_POSITION_SUCCESS:
			var copyState = { ...state };
			copyState.position = action.data;
			return {
				...copyState,
			};

		case actionTypes.FETCH_POSITION_FAILED:
			var copyState = { ...state };
			copyState.position = [];
			return {
				...copyState,
			};

		case actionTypes.FETCH_ROLE_SUCCESS:
			var copyState = { ...state };
			copyState.roles = action.data;
			return {
				...copyState,
			};

		case actionTypes.FETCH_ROLE_FAILED:
			state.roles = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_USER_SUCCESS:
			state.listUser = action.users;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_USER_FAILED:
			state.users = [];
			return {
				...state,
			};

		case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
			state.topDoctors = action.topDoctorsData;
			return {
				...state,
			};

		case actionTypes.FETCH_TOP_DOCTOR_FAILED:
			state.topDoctors = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
			state.allDoctors = action.allDoctorData;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_DOCTOR_FAILED:
			state.allDoctors = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
			state.allScheduleTime = action.dataTime;
			return {
				...state,
			};

		case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
			state.allScheduleTime = [];
			return {
				...state,
			};

		case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
			state.doctorInfoData = action.data;
			return {
				...state,
			};

		case actionTypes.FETCH_DOCTOR_INFO_FAILED:
			state.doctorInfoData = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default adminReducer;
