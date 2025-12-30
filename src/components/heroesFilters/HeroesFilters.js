// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useSelector} from "react-redux";
import {useEffect} from "react";
import {
    activeFilterChanged,
    filtersFetched,
    filtersFetching,
    filtersFetchingError,
} from "../../actions";

import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import classNames from "classnames";


const HeroesFilters = () => {
    const {activeFilter, filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

    }, []);

    const renderFilters = (data) => {
        if (data.length > 0) {
            return data.map(({name, className, label}) => {
                const btnClass = classNames("btn", className, {'active': name === activeFilter});
                return <button className={btnClass} key={name} id={name} onClick={()=>{dispatch(activeFilterChanged(name))}}>{label}</button>
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