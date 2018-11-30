const initialState = {
  type: 'custom', // custom | dynamic | preset
  colorHex: null,
  colorName: ''
};

function colorForToday() {
  return '#888888';
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_THEME_COLOR':
      let chosenColor;
      const { type, color } = action.options;
      debugger;
      if (type === 'dynamic') {
        chosenColor = colorForToday();
      } else if (type === 'custom') {
        chosenColor = color;
      } else {
        chosenColor = color;
      }

      return {
        ...state,
        type,
        colorHex: chosenColor
      };
    default:
      return state;
  }
}
