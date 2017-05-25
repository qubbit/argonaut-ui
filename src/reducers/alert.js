const initialState = {
  message: '',
  timeout: null,
  visible: false,
  type: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ALERT_INFO':
      return {
        ...state,
        visible: true,
        timeout: action.timeout,
        message: action.message,
        type: 'info'
      };
    case 'SHOW_ALERT_WARNING':
      return {
        ...state,
        visible: true,
        timeout: action.timeout,
        message: action.message,
        type: 'warning'
      };
    case 'SHOW_ALERT_SUCCESS':
      return {
        ...state,
        visible: true,
        timeout: action.timeout,
        message: action.message,
        type: 'success'
      };
    case 'SHOW_ALERT_FAILURE':
      return {
        ...state,
        visible: true,
        timeout: action.timeout,
        message: action.message,
        type: 'failure'
      };
    case 'HIDE_ALERT':
      return {
        ...state,
        message: '',
        timeout: null,
        visible: false,
      };
    default:
      return state;
  }
}
