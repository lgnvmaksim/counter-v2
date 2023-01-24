import React, {ChangeEvent} from 'react';
import s from './../CounterWithoutLocalStorage/CounterWithoutLS.module.css'
import {ValueType} from "../CounterWithoutLocalStorage/CounterWithoutLocalStorage";


type PropsType = {
    value: ValueType
    setValue: (value: ValueType) => void
    setMessage: (message: string) => void
    id: string
    startValue: number
    checkCorrectValue:boolean
}

export const InputSuper = ({value, setValue, setMessage, id, startValue, checkCorrectValue}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.currentTarget.id + 'Value']: +e.currentTarget.value, startValue: null
        })
        setMessage('Выбери что-нить и жмякай "Set!"')
    }

    return <input className={checkCorrectValue ? s.enteredErrorInput :s.enteredInput}
                  id={id}
                  type={'number'}
                  value={startValue}
                  onChange={onChangeHandler}
    />
};