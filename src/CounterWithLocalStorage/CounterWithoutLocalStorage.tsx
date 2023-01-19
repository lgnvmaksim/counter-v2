import React, {ChangeEvent, memo, useCallback, useEffect, useState} from 'react';
import s from './CounterWithoutLS.module.css'

type ValueType = {
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
    const [message, setMessage] = useState<string | null>('Нажми на "Жмяк! и узри магию!')

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.currentTarget.id + 'Value']: +e.currentTarget.value, startValue: null
        })
        setMessage('Выбери что-нить и жмякай "Жмяк!"')
    }, [value])

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

    let blockButton: boolean = false

    const checkCorrectValue = () => value.minValue <= 0 || value.maxValue <= 0 || value.minValue >= value.maxValue
    useEffect(() => {
        if (checkCorrectValue()) {
            setMessage('Ата-та по рукам! Введи корректные значения')
        }
    }, [value.minValue, value.maxValue])


    const disabledButtonToStart = () => {
        if (value.startValue === value.maxEnteredValue) {
            blockButton = true
        }
        return blockButton
    }


    return <div className={s.container}>
        <div className={s.leftBlock}>
            <div className={s.insideLeftBlock}>
                <div className={s.span}>
                    <span className={s.textValue}>min value</span>
                    <input className={s.enteredInput}
                           id={'min'}
                           type={'number'}
                           value={value.minValue}
                           onChange={onChangeHandler}
                    />
                </div>
                <div className={s.span}>
                    <span className={s.textValue}>max value</span>
                    <input className={s.enteredInput}
                           id={'max'}
                           type={'number'}
                           value={value.maxValue}
                           onChange={onChangeHandler}
                    />
                </div>

            </div>
            <div className={s.buttonContainer}>
                <button className={s.setButton} onClick={onClickSetHandler} disabled={checkCorrectValue()}>set</button>
            </div>

        </div>

        <div className={s.rightBlock}>
            <div>{value.startValue} </div>
            <div> {message}</div>
            <button onClick={onClickStartHandler} disabled={disabledButtonToStart()}>Вперед</button>
            <button onClick={onClickResetHandler}>Обнулить</button>

        </div>


    </div>
})
