export interface IToggleOptionButtonOption<T> {
  key: T;
  displayName: string;
}
export interface IToggleOptionButtonsProps<T> {
  exclusive?: boolean;
  options: IToggleOptionButtonOption<T>[];
  value: T | T[];
  onChange: (newValue: T | T[]) => void;
}
