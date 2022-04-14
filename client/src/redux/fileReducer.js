// Action types
const UPLOAD_FILE = 'UPLOAD_FILE';
const DELETE_FILE = 'DELETE_FILE';

const initial_state = {
  file: null,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        file: action.payload
      }
    case DELETE_FILE:
      return {
        ...state,
        file: null
      }
    default:
      return state;
  }
}

export default reducer;