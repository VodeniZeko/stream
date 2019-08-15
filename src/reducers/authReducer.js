const INIT_STATE = {
	IsSignedIn: null,
	userId: null
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return { ...state, IsSignedIn: true, userId: action.payload };
		case "SIGN_OUT":
			return { ...state, IsSignedIn: false, userId: null };
		default:
			return state;
	}
};
