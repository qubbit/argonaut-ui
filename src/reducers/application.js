const type = localStorage.getItem('themeColorType') || 'custom';
const initialState = {
  theme: {
    type: type, // custom | dynamic | preset
    colorHex: function() {
      if (type === 'dynamic') {
        return colorForToday();
      } else {
        return localStorage.getItem('themeColorHex') || '#007bff';
      }
    },
    colorName: ''
  }
};

function colorForToday() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return `hsl(${day}, 50%, 50%)`;
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
