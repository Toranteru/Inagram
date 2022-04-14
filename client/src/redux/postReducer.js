// Action types
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_CAPTION = 'UPDATE_CAPTION';
const DELETE_POST = 'DELETE_POST';
const SUBMIT_POST = 'SUBMIT_POST';

const initial_state = {
  title: null,
  caption: null,
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload
      }
    case UPDATE_CAPTION:
      return {
        ...state,
        caption: action.payload
      }
    case DELETE_POST:
      return {
        ...state,
        title: null,
        caption: null
      }
    case SUBMIT_POST:
      return {
        ...state,
        title: null,
        caption: null
      }
    default:
      return state;
  }
}

export default reducer;