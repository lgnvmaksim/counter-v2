import React, {ChangeEvent, memo, useCallback, useEffect, useState} from 'react';
import s from './CounterWithoutLS.module.css'
import {ButtonSuper} from "../Components/ButtonSuper";

export type ValueType = {
    minValue: number,
    maxValue: number,
    minEnteredValue: number,
    maxEnteredValue: number,
    startValue: number | null
    step: number,
    error: boolean
}

export const CounterWithoutLocalStorage = memo(() => {
    const [value, setValue] = useState<ValueType>({
        minValue: 1,
        maxValue: 5,
        minEnteredValue: 0,
        maxEnteredValue: 0,
        startValue: null,
        step: 1,
        error: false,
    })
    const [message, setMessage] = useState<string | null>('Нажми на "set" и узри магию!')


    const onClickSetHandler = useCallback(() => {
        setValue({
            ...value,
            minEnteredValue: value.minValue,
            maxEnteredValue: value.maxValue,
            startValue: value.minValue,
        })
        setMessage(null)
    }, [value])

    const onClickStartHandler = useCallback(() => {
        if (value.startValue) {
            setValue({
                ...value,
                startValue: value.startValue + value.step
            })
        }
    }, [value])

    const onClickResetHandler = useCallback(() => {
        if (value.startValue !== null) {
            setValue({...value, startValue: value.minEnteredValue})
        }
    }, [value])


    const checkCorrectValue: boolean = value.minValue <= 0 || value.maxValue <= 0 || value.minValue >= value.maxValue
    useEffect(() => {
        if (checkCorrectValue) {
            setMessage('Введи корректные значения')
        }
    }, [value.minValue, value.maxValue])


    let blockButton: boolean = false
    const disabledButtonToStart = () => {
        if (value.startValue === value.maxEnteredValue || message) {
            blockButton = true
        }
        return blockButton
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.currentTarget.id + 'Value']: +e.currentTarget.value, startValue: null
        })
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
