export type Option = { name: string, value: string, disabled?: boolean };

export type SelectOptions = Option[];

export type SelectOptionGroups = Array<{ name: string, options: SelectOptions }>;
