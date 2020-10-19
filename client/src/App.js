import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Navigation from './Navbar'
import Home from './Home'
import WioIndex from './wio/WioIndex'
import Game from './wio/game/Game'

// font awesome initialization
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGraduationCap,
  faSignInAlt,
  faHome,
  faDice,
} from '@fortawesome/free-solid-svg-icons'
library.add(faGraduationCap, faSignInAlt, faHome, faDice)

const games = [
  {
    game: 'Words in Order',
    url: '/wio',
  },
]

function App() {
  return (
    <>
      <Navigation games={games} />

      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} games={games} />}
        />
        <Route
          exact
          path="/wio"
          render={props => <WioIndex {...props} games={games} />}
        />
        <Route path="/wio/:id" component={Game} />
      </Switch>
    </>
  )
}

export default App
