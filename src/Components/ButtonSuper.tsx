import React from 'react';
import s from "../CounterWithoutLocalStorage/CounterWithoutLS.module.css";
import {ValueType} from "../CounterWithoutLocalStorage/CounterWithoutLocalStorage";


type PropsType = {
    onClickCallback: () => void
    disabled?: boolean
    name: string
}



export const ButtonSuper = ({onClickCallback, disabled, name}: PropsType) => <button className={s.setButton}
                                                                                     onClick={onClickCallback}
                                                                                     disabled={disabled}>{name}</button>

