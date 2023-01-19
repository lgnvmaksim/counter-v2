import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type ValueType = {
    minValue: number,
    maxValue: number,
    minEnteredValue: number,
    maxEnteredValue: number,
    startValue: number | null
    step: number,
    error: boolean
}

export const CounterWithLocalStorage = memo (() => {
    const [value, setValue] = useState<ValueType>({
        minValue: 0,
        maxValue: 1,
        minEnteredValue: 0,
        maxEnteredValue: 0,
        startValue: 0,
        step: 1,
        error: false,
    })
    const [message, setMessage] = useState<string | null>('Нажми на "Жмяк! и узри магию!')

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.currentTarget.id + 'Value']: +e.currentTarget.value, startValue: null
        })
        setMessage('Выбери что-нить и жмякай "Жмяк!"')
    }, [value])

    const onClickSetHandler = useCallback ( () => {
        setValue({
            ...value,
            minEnteredValue: value.minValue,
            maxEnteredValue: value.maxValue,
            startValue: value.minValue,
        })
        setMessage(null)
    }, [value] )

    const onClickStartHandler = useCallback ( () => {
        if (value.startValue) {
            setValue({
                ...value,
                startValue: value.startValue + value.step
            })
        }
    },[value])

    const onClickResetHandler = useCallback (() => {
        if (value.startValue !== null) {
            setValue({...value, startValue: value.minEnteredValue})
        }
    },[value])

    const checkCorrectValue = useCallback(() => {
        let checkCorrectValue: boolean = (value.startValue === value.maxValue
            || Number(value.startValue) > value.maxValue
            || Number(value.startValue) <= 0
            || value.maxValue <= 0)
        checkCorrectValue&& setMessage('Ата-та по рукам! Не может быть так! Верни корректные значения!')
        return checkCorrectValue
    },[value, message])

    let blockButton: boolean = false

    const disabledButtonToStart = useCallback (() => {
        if (value.startValue === value.maxEnteredValue) {
            blockButton = true
        }
        return blockButton
    },[value])


    return <div>
        <span>min value</span>
        <input
            id={'min'}
            type={'number'}
            value={value.minValue}
            onChange={onChangeHandler}
        />
        <span>max value</span>
        <input
            id={'max'}
            type={'number'}
            value={value.maxValue}
            onChange={onChangeHandler}
        />
        <button onClick={onClickSetHandler}>Жмяк</button>
        <div>{value.startValue} {message} </div>

        <hr/>
        <div>minEnteredValue: {value.minEnteredValue}</div>
        <div>maxEnteredValue: {value.maxEnteredValue}</div>
        <button onClick={onClickStartHandler} disabled={disabledButtonToStart()}>Вперед</button>
        <button onClick={onClickResetHandler}>Обнулить</button>
    </div>
})
