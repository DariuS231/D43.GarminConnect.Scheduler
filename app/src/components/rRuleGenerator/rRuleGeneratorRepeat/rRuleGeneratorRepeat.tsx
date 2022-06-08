import * as React from "react";
import { IRRuleGeneratorRepeatProps } from ".";
import { FrequencyDaily } from "./frequencyDaily";
import { FrequencySelector } from "./frequencySelector";
import { FrequencyWeekly } from "./frequencyWeekly";
import { RRule, Options } from "rrule";

import "./rRuleGeneratorRepeat.module.scss";
import { FrequencyMonthly } from "./frequencyMonthly";

export const RRuleGeneratorRepeat = (
  props: IRRuleGeneratorRepeatProps
): JSX.Element => {
  
  const { rrule, onRruleChange } = props;

  const onOptionsChange = (newOptions: Partial<Options>) => {
    onRruleChange(new RRule(newOptions));
  };
  return (
    <div>
      <FrequencySelector rrule={rrule} onChange={onOptionsChange} />
      <FrequencyDaily rrule={rrule} onChange={onOptionsChange} />
      <FrequencyWeekly rrule={rrule} onChange={onOptionsChange} />
      <FrequencyMonthly rrule={rrule} onChange={onOptionsChange} />
    </div>
  );
};
