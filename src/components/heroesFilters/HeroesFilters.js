import {useSelector} from "react-redux";
import {useEffect} from "react";

import {activeFilterChanged, fetchFilters, selectAll} from "./filterSlice";

import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import classNames from "classnames";
import store from "../../store";


const HeroesFilters = () => {
    const {activeFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters())

    }, []);

    const renderFilters = (data) => {
        if (data.length > 0) {
            return data.map(({name, className, label}) => {
                const btnClass = classNames("btn", className, {'active': name === activeFilter});
                return <button className={btnClass} key={name} id={name} onClick={() => {
                    dispatch(activeFilterChanged(name))
                }}>{label}</button>
            })
        }
    }


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;