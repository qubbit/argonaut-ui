import { colorForToday } from '../utils';

const type = localStorage.getItem('themeColorType') || 'custom';
const color =
  type === 'dynamic'
    ? colorForToday()
    : localStorage.getItem('themeColorHex') || '#007bff';
const name = localStorage.getItem('themeColorName') || 'Default Blue';

const initialState = {
  theme: {
    type, // custom | dynamic | preset
    color,
    name
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_THEME_COLOR':
      let chosenColor;
      const { type, name, color } = action.options;

      if (type === 'dynamic') {
        chosenColor = colorForToday();
      } else {
        chosenColor = color;
      }

      return {
        ...state,
        theme: {
          type,
          name,
          color: chosenColor
        }
      };
    default:
      return state;
  }
}
