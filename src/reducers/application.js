const initialState = {
  theme: {
    type: localStorage.getItem('themeColorType') || 'custom', // custom | dynamic | preset
    colorHex: localStorage.getItem('themeColorHex') || '#007bff',
    colorName: ''
  }
};

function colorForToday() {
  return '#888888';
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_THEME_COLOR':
      let chosenColor;
      const { type, color } = action.options;

      if (type === 'dynamic') {
        chosenColor = colorForToday();
      } else {
        chosenColor = color;
      }

      return {
        ...state,
        theme: {
          type,
          colorHex: chosenColor
        }
      };
    default:
      return state;
  }
}
