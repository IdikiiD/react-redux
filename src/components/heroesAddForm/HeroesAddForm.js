// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров


import {addHerro} from "../../actions";
import {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {v4 as uuidv4} from 'uuid';
import {useHttp} from '../../hooks/http.hook';


const HeroesAddForm = () => {

    const [herroName, setHerroName] = useState('')
    const [herroDescription, setHerroDescription] = useState('')
    const [herroElement, setHerroElement] = useState('')

    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch()
    const {request} = useHttp();


    const submitForm = async (e) => {

        e.preventDefault()
        const newHerro = {
            id: uuidv4(),
            name: herroName,
            description: herroDescription,
            element: herroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHerro))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(() => {
                dispatch(addHerro(newHerro))
            })
            .catch(err => console.log(err))


        setHerroName("");
        setHerroDescription("");
        setHerroElement("");
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(filter => {
                if (filter === 'all') return null;
                return <option key={filter} value={filter}>{filter}</option>

            })
        }
    }


    return (
        <form
            onSubmit={submitForm}

            className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={(e) => setHerroName(e.target.value)}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setHerroDescription(e.target.value)}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={(e) => setHerroElement(e.target.value)}
                    required
                    className="form-select"
                    id="element"
                    name="element">
                    <option value=''>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button
                type="submit" className="btn btn-primary">Создать
            </button>


        </form>
    )
}

export default HeroesAddForm;