import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { RRuleFrequency } from ".";

export interface IFrequencyWeeklyProps {
  frequency: RRuleFrequency;
}

export const FrequencyWeekly = (props: IFrequencyWeeklyProps): JSX.Element => {
  if (props.frequency !== RRuleFrequency.Weekly) {
    return <></>;
  }

  return (
    <div>
      Repeat every
      <Select>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={17}>17</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={19}>19</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={21}>21</MenuItem>
        <MenuItem value={22}>22</MenuItem>
        <MenuItem value={23}>23</MenuItem>
        <MenuItem value={24}>24</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={26}>26</MenuItem>
        <MenuItem value={27}>27</MenuItem>
        <MenuItem value={28}>28</MenuItem>
        <MenuItem value={29}>29</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={31}>31</MenuItem>
        <MenuItem value={32}>32</MenuItem>
        <MenuItem value={33}>33</MenuItem>
        <MenuItem value={34}>34</MenuItem>
        <MenuItem value={35}>35</MenuItem>
        <MenuItem value={36}>36</MenuItem>
        <MenuItem value={37}>37</MenuItem>
        <MenuItem value={38}>38</MenuItem>
        <MenuItem value={39}>39</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={41}>41</MenuItem>
        <MenuItem value={42}>42</MenuItem>
        <MenuItem value={43}>43</MenuItem>
        <MenuItem value={44}>44</MenuItem>
        <MenuItem value={45}>45</MenuItem>
        <MenuItem value={46}>46</MenuItem>
        <MenuItem value={47}>47</MenuItem>
        <MenuItem value={48}>48</MenuItem>
        <MenuItem value={49}>49</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={51}>51</MenuItem>
        <MenuItem value={52}>52</MenuItem>
      </Select>
      Week(s)
      <ToggleButtonGroup color="primary">
        <ToggleButton value="Mon">Mon</ToggleButton>
        <ToggleButton value="Tue">Tue</ToggleButton>
        <ToggleButton value="Wed">Wed</ToggleButton>
        <ToggleButton value="Thu">Thu</ToggleButton>
        <ToggleButton value="Fri">Fri</ToggleButton>
        <ToggleButton value="Sat">Sat</ToggleButton>
        <ToggleButton value="Sun">Sun</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
