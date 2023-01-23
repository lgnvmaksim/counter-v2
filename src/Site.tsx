import React from 'react';
import {CounterWithoutLocalStorage} from "./CounterWithoutLocalStorage/CounterWithoutLocalStorage";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";

export const Site = () => {
    return <div>
            <div>
                <div><NavLink to={'page/0'}>StartPage</NavLink></div>
                <div><NavLink to={'page/1'}>CounterWithoutRedux</NavLink></div>

            </div>
            <div>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/page0'}/>}/>
                    <Route path={'page/1'} element={<CounterWithoutLocalStorage/>}/>
                </Routes>
            </div>
        </div>
};