export function changeThemeColor(options) {
  return dispatch => {
    localStorage.setItem('themeColorType', options.type);
    localStorage.setItem('themeColorHex', options.color);
    dispatch({ type: 'CHANGE_THEME_COLOR', options });
  };
}
