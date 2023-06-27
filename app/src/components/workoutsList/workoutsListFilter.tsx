import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import "./workoutsList.module.scss";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";

export interface IWorkoutsListFilterProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const WorkoutsListFilter = (
  props: IWorkoutsListFilterProps
): JSX.Element => {
  const { searchText, setSearchText } = props;

  const handleClickShowPassword = () => setSearchText("");
  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <Input
        id="standard-adornment-amount"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          searchText && (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }
        sx={{
          paddingRight: "5px",
          input: { boxShadow: "none", border: "none" },
        }}
        value={searchText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value);
        }}
      />
    </FormControl>
  );
};
