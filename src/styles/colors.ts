export const themeColors = Object.freeze({
    blue: '#6155BD',
    green: '#00A651',
    red: '#e74e36',
    yellow: '#FFC700',
    orange: '#FF682E',
    backgroundColorSecondary: '#2F3A4F',
    backgroundColorTertiary: '#181e29',
    disabledText: '#A9AAA9'
});

export const buttonColors: Readonly<Record<string, string>> = Object.freeze({
    blue: themeColors.blue,
    green: themeColors.green,
    red: themeColors.red,
    orange: themeColors.orange,
    'green-success': '#18C682',
    yellow: themeColors.yellow
});

export const progressBarColors = Object.freeze({
    blue: '#387AFF',
    pink: '#F5009B',
    yellow: '#FFC700'
});
