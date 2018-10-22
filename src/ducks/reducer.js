import axios from "axios"

const GET_USER = "GET_USER"
const GET_FAVORITES = "GET_FAVORITES"
const PROFILE_CHANGE = "PROFILE_CHANGE"

export function getUser(id) {
  return {
    type: GET_USER,
    payload: axios.get(`/api/user/${id}`)
  }
}

export function getFavorites(id) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites/${id}`)
  }
}

export function profileChange(name, value) {
  return {
    type: PROFILE_CHANGE,
    name: name,
    payload: value
  }
}

const initialState = {
  user: {
    email: "",
    user_id: null,
    username: "",
    admin: false,
    sexual_orientation: "",
    gender: "",
    display_img: "",
    date_of_birth: ""
  },
  loggedIn: false,
  isLoading: false,
  favorites: []
}

export default function reducer(state = initialState, action) {
  console.log("state, action", state, action)
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        user: { ...state.user, ...action.payload.data[0] }
      }
    case `${GET_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      }

    case `${GET_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        favorites: action.payload.data[0].array
      }

    case `${GET_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      }

    case PROFILE_CHANGE:
      console.log("state.user", state.user)
      console.log("")
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.payload
        }
      }
    default:
      console.log("state", state)
      return state
  }
}
