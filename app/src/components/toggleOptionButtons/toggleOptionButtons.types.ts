export interface IToggleOptionButtonOption {
  key: string;
  displayName: string;
}
export interface IToggleOptionButtonsProps {
  exclusive?: boolean;
  options: IToggleOptionButtonOption[];
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
}
