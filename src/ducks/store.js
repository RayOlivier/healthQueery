import { createStore, applyMiddleware, compose } from "redux" //combine allows us to use multiple reducers
import promiseMiddleware from "redux-promise-middleware" //works similarly to body-parser...

import reducer from "./reducer"

// const store = createStore(counter)

//separation of concerns

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(applyMiddleware(promiseMiddleware())) //middleware gives more refined control over async requests.... allows us to use axios

const store = createStore(reducer, enhancers)

export default store
