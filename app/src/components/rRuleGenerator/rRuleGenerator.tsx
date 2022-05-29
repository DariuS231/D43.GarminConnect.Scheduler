import * as React from "react";
import { IRRuleGeneratorProps } from ".";
import { RRuleGeneratorEnd } from "./rRuleGeneratorEnd";
import { RRuleGeneratorRepeat } from "./rRuleGeneratorRepeat";
import { RRuleGeneratorStart } from "./rRuleGeneratorStart";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import "./rRuleGenerator.module.scss";

export const RRuleGenerator = (props: IRRuleGeneratorProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <div>
          <RRuleGeneratorStart />
        </div>
        <div>
          <RRuleGeneratorRepeat />
        </div>
        <div>
          <RRuleGeneratorEnd />
        </div>
      </div>
    </LocalizationProvider>
  );
};
