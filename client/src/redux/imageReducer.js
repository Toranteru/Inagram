// Action types
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';
const SUBMIT_POST = 'SUBMIT_POST';

const initial_state = {
  image: null,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: action.payload
      }
    case DELETE_IMAGE:
      return {
        ...state,
        image: null,
      }
    case SUBMIT_POST:
      return {
        ...state,
        image: null,
      }
    default:
      return state;
  }
}

export default reducer;