const spaceColors = ['dark', 'light', 'primary', 'secondary', 'blue'] as const;
export type SpaceColor = typeof spaceColors[number];

export const isValidSpaceColor = (value: string) => spaceColors.includes(value as SpaceColor);
