const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'

            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'ADD_HERO':
            let newCreatedHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroes,

                filteredHeroes: state.activeFilter === 'all' ?
                    newCreatedHeroes :
                    newCreatedHeroes.filter(item => item.element === state.activeFilter)
            }

        case'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'

            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === action.payload)
            }
        case 'DELETE_HERO':
            const updatedHeroes = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: updatedHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                    updatedHeroes :
                    updatedHeroes.filter(item => item.element === state.activeFilter)
            }

        default:
            return state

    }
}

export default reducer;