import * as React from "react";
import { IRRuleGeneratorRepeatProps, RRuleFrequency } from ".";
import { FrequencyDaily } from "./frequencyDaily";
import { FrequencyMonthly } from "./frequencyMonthly";
import { FrequencySelector } from "./frequencySelector";
import { FrequencyWeekly } from "./frequencyWeekly";

import "./rRuleGeneratorRepeat.module.scss";

export const RRuleGeneratorRepeat = (
  props: IRRuleGeneratorRepeatProps
): JSX.Element => {
  const [frequency, setFrequency] = React.useState(RRuleFrequency.Weekly);
  return (
    <div>
      <FrequencySelector
        frequency={frequency}
        onChange={(event) => {
          setFrequency(
            RRuleFrequency[event.target.value as keyof typeof RRuleFrequency]
          );
        }}
      />
      <FrequencyDaily frequency={frequency} />
      <FrequencyWeekly frequency={frequency} />
      <FrequencyMonthly frequency={frequency} />
    </div>
  );
};
