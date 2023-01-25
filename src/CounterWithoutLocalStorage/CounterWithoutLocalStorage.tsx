import React, {ChangeEvent, memo, useEffect, useState} from 'react';
import s from './CounterWithoutLS.module.css'
import {ButtonSuper} from "../Components/ButtonSuper";
import {
    onChangeHandlerAC,
    onClickResetHandlerAC,
    onClickSetHandlerAC,
    onClickStartHandlerAC
} from "./reducer/CounterReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";

export type ValueType = {
    minValue: number,
    maxValue: number,
    minEnteredValue: number,
    maxEnteredValue: number,
    startValue: number | null
    step: number,
}

export const CounterWithoutLocalStorage = memo(() => {
    const value = useSelector<AppRootStateType, ValueType>(state => state.counter)
    const dispatch = useDispatch()

    const [message, setMessage] = useState<string | null>('Нажми на "set" и узри магию!')
    const onClickSetHandler = () => {
        dispatch(onClickSetHandlerAC())
        setMessage(null)
    }

    const onClickStartHandler = () => {
        dispatch(onClickStartHandlerAC())
    }

    const onClickResetHandler = () => {
        dispatch(onClickResetHandlerAC())
    }

    const checkCorrectValue: boolean = value.minValue <= 0 || value.maxValue <= 0 || value.minValue >= value.maxValue
    useEffect(() => {
        if (checkCorrectValue) {
            setMessage('Введи корректные значения')
        }
    }, [checkCorrectValue])


    let blockButton: boolean = false
    const disabledButtonToStart = () => {
        if (value.startValue === value.maxEnteredValue || message) {
            blockButton = true
        }
        return blockButton
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(onChangeHandlerAC(e.currentTarget.id + 'Value', +e.currentTarget.value))
        !checkCorrectValue && setMessage('Выбери что-нить и жмякай "Set!"')
    }


    return <div className={s.container}>
        <div className={s.leftBlock}>
            <div className={s.insideLeftBlock}>
                <div className={s.span}>
                    <span className={s.textValue}>min value</span>
                    <input className={checkCorrectValue ? s.enteredErrorInput : s.enteredInput}
                           id={'min'}
                           type={'number'}
                           value={value.minValue}
                           onChange={onChangeHandler}
                    />
                </div>
                <div className={s.span}>
                    <span className={s.textValue}>max value</span>
                    <input className={checkCorrectValue ? s.enteredErrorInput : s.enteredInput}
                           id={'max'}
                           type={'number'}
                           value={value.maxValue}
                           onChange={onChangeHandler}
                    />
                </div>
            </div>
            <div className={s.buttonContainer}>
                <ButtonSuper onClickCallback={onClickSetHandler} disabled={checkCorrectValue} name={'set'}/>
            </div>
        </div>

        <div className={s.rightBlock}>
            <div className={s.valueContainer}>
                <div className={value.startValue === value.maxValue ? s.value : ''}>{value.startValue} </div>
                <div className={s.message}>{message}</div>
            </div>
            <div className={s.buttonContainer}>
                <ButtonSuper onClickCallback={onClickStartHandler} name={'inc'} disabled={disabledButtonToStart()}/>
                <ButtonSuper onClickCallback={onClickResetHandler} name={'reset'} disabled={!!message}/>
            </div>
        </div>
    </div>
})
