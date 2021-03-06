export interface IRRuleGeneratorDatePickerProps {
  onChange: (d: Date | null) => void;
  value: Date;
  minDate?: Date;
  label?: string;
}
