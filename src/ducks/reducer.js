import axios from "axios"

const GET_USER = "GET_USER"

export function getUser(id) {
  return {
    type: GET_USER,
    payload: axios.get(`/api/user/${id}`)
  }
}

// export function checkAdmin(){
//   return{
//     type: CHECK_ADMIN,
//     payload:
//   }
// }

const initialState = {
  user: {
    email: "",
    user_id: null,
    username: "",
    isAdmin: false,
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
      console.log(action.payload.data[0])
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        user: { ...state.user, ...action.payload.data[0] }
      }
    case `${GET_USER}_PENDING`:
      console.log("action payload", action.payload)

      return {
        ...state,
        isLoading: true
      }
    default:
      console.log("state", state)
      return state
  }
}
