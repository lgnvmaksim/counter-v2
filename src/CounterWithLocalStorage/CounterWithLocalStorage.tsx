import React, {ChangeEvent, useState} from 'react';

type ValueType = {
    minValue: number,
    maxValue: number,
    minEnteredValue: number,
    maxEnteredValue: number,
    startValue: number | null
    step: number,
    message: string | null
    error: boolean
}

export const CounterWithLocalStorage = () => {
    const [value, setValue] = useState<ValueType>({
        minValue: 0,
        maxValue: 1,
        minEnteredValue: 0,
        maxEnteredValue: 0,
        startValue: 0,
        step: 1,
        error: false,
        message: null
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.currentTarget.id + 'Value']: +e.currentTarget.value,
            message: 'Выбери что-нить и жмякай "Жмяк!"',
            startValue: null
        })
    }

    const onClickSetHandler = () => {
        setValue({
            ...value,
            minEnteredValue: value.minValue,
            maxEnteredValue: value.maxValue,
            startValue: value.minValue,
            message: null
        })
    }

    const onClickStartHandler = () => {
        if (value.startValue) {
            setValue({
                ...value,
                startValue: value.startValue + value.step
            })
        }
    }

    const onClickResetHandler = () => {
        if (value.startValue !== null) {
            setValue({...value, startValue: value.minEnteredValue})
        }

    }

    let blockButton: boolean = false

    const disabledButtonToStart = () => {
        if (value.startValue === value.maxEnteredValue) {
            blockButton = true
        }
        return blockButton
    }


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
        <div>{value.startValue} {value.message} </div>

        <hr/>
        <div>minEnteredValue: {value.minEnteredValue}</div>
        <div>maxEnteredValue: {value.maxEnteredValue}</div>
        <button onClick={onClickStartHandler} disabled={disabledButtonToStart()}>Вперед</button>
        <button onClick={onClickResetHandler}>Обнулить</button>
    </div>
};
