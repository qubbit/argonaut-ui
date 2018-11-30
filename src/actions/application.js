export function changeThemeColor(options) {
  return dispatch => {
    dispatch({ type: 'CHANGE_THEME_COLOR', options });
  };
}
