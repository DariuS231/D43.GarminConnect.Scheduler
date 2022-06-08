export interface IKeyValueOption {
  key: string;
  value: string;
}

export interface IStringOptionsSelectProps {
  value: string | IKeyValueOption;
  options: (string | IKeyValueOption)[];
  onChange: (newValue: string | IKeyValueOption) => void;
}
