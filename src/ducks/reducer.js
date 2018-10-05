const initialState = {
  user: {}
}

export default function reducer(state = initialState, action) {
  console.log("state, action", state, action)
  switch (action.type) {
    default:
      return state
  }
}
