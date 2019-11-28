import { removeItemFromList } from '../utils'
import { SHOWS_URL, SEARCH_SHOWS_URL, WATCHLISTS_URL } from '../utils/constants'

export const types = {
    REQUEST_ALL: 'shows.request.all',
    REQUEST_ERROR: 'shows.request.error',
    START_LOADING: 'shows.start_loading',
    SHOW_CHANGED: 'shows.changed',
    WATCHLIST_ADD: 'watchlist.add',
    WATCHLIST_REMOVE: 'watchlist.remove',
    REQUEST_ALL_WATCHLIST: 'watchlist.all'
}

export const INITIAL_STATE = {
    showList: [],
    selectedShow: null,
    loading: false,
    watchList: []
}

const processRequest = (dispatch, request) => {
    dispatch({
        type: types.START_LOADING
    })
    dispatch(request)
}

export const getShows = (query='') => dispatch => {
    let url = SHOWS_URL
    if (query) {
        url = `${SEARCH_SHOWS_URL}?q=${query}`
    }
    processRequest(
        dispatch,
        {
            types: ['', types.REQUEST_ALL, types.REQUEST_ERROR],
            promise: client => client.get(
                url,
                { 'Content-Type': 'application/json' }
            )
        }
    )
}

export const getShow = id => dispatch => {
    processRequest(
        dispatch,
        {
            types: ['', types.SHOW_CHANGED, types.REQUEST_ERROR],
            promise: client => client.get(
                `${SHOWS_URL}/${id}?embed[]=cast&embed[]=episodes`,
                { 'Content-Type': 'application/json' }
            )
        }
    )
}

export const getWatchlist = () => dispatch => {
    processRequest(
        dispatch,
        {
            types: ['', types.REQUEST_ALL_WATCHLIST, types.REQUEST_ERROR],
            promise: client => client.get(
                WATCHLISTS_URL,
                { 'Content-Type': 'application/json' }
            )
        }
    )
}

export const selectShow = show => ({
    type: types.SHOW_CHANGED,
    payload: show
})

export const addShow = data => dispatch => {
    processRequest(
        dispatch,
        {
            types: ['', types.WATCHLIST_ADD, types.REQUEST_ERROR],
            promise: client => client.post(
                WATCHLISTS_URL,
                { 'Content-Type': 'application/json' },
                { data }
            )
        }
    )
}

let markedToDelete = null

export const removeShow = data => dispatch => {
    markedToDelete = data
    processRequest(
        dispatch,
        {
            types: ['', types.WATCHLIST_REMOVE, types.REQUEST_ERROR],
            promise: client => client.delete(
                `${WATCHLISTS_URL}${data.id}/`,
                { 'Content-Type': 'application/json' },
            )
        }
    )
}

const reducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.REQUEST_ALL: {
            return {
                ...state,
                showList: action.payload,
                loading: false
            }
        }
        case types.START_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case types.SHOW_CHANGED: {
            return {
                ...state,
                selectedShow: action.payload
            }
        }
        case types.WATCHLIST_ADD: {
            return {
                ...state,
                watchList: [...state.watchList, action.payload],
                loading: false
            }
        }
        case types.REQUEST_ALL_WATCHLIST: {
            return {
                ...state,
                watchList: action.payload.results,
                loading: false
            }
        }
        case types.WATCHLIST_REMOVE: {
            return {
                ...state,
                watchList: removeItemFromList([...state.watchList], markedToDelete),
                loading: false
            }
        }
        default:
            return state
    }
}

export default reducer