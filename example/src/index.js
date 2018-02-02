import { h, render } from 'preact'
import { createStore } from 'redux'
import { connect, Provider } from 'preact-redux'
import AnimateOnChange from '../..'
import './style.css'

const initialState = {
  diff: 0,
  score: 0
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_SCORE':
      return Object.assign({}, state, {
        diff: action.diff,
        score: state.score + action.diff })
    default:
      return state
  }
}

const store = createStore(reducer)
setInterval(() => {
  store.dispatch({
    type: 'INCREMENT_SCORE',
    diff: 10
  })
}, 2000)
window.store = store

const AppComponent = ({diff, score}) =>
  <div className='App'>
    <AnimateOnChange
      baseClassName='Score'
      animationClassName='Score--bounce'
      animate={diff !== 0}>
        Score: {score}
    </AnimateOnChange>
  </div>

const App = connect(s => s)(AppComponent)

render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
)