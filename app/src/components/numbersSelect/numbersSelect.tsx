import * as React from "react";
import { INumbersSelectProps } from ".";

import styles from "./numbersSelect.module.scss"

export const NumbersSelect = (props: INumbersSelectProps): JSX.Element => {
    return (<div className={styles.numbersSelect}>
        Hello World NumbersSelect!!!
    </div>);
};