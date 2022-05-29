import * as React from "react";
import { IRRuleGeneratorProps } from ".";
import { RRuleGeneratorEnd } from "./rRuleGeneratorEnd";
import { RRuleGeneratorRepeat } from "./rRuleGeneratorRepeat";
import { RRuleGeneratorStart } from "./rRuleGeneratorStart";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import "./rRuleGenerator.module.scss";

export const RRuleGenerator = (props: IRRuleGeneratorProps): JSX.Element => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                Start
              </Typography>
            </Grid>
          </Grid>
          <RRuleGeneratorStart />
        </Box>
        <Divider variant="middle" />

        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                Repeat
              </Typography>
            </Grid>
          </Grid>
          <RRuleGeneratorRepeat />
        </Box>
        <Divider variant="middle" />

        <Box>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                End
              </Typography>
            </Grid>
          </Grid>
          <RRuleGeneratorEnd />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
