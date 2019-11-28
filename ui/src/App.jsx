import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './redux/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Details from './containers/Details'
import Search from './containers/Search'
import WatchList from './containers/Watchlist'
import './css/App.css'

const store = createStore()

class App extends Component {
  render() {
    return (

        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/watchlist' component={WatchList} />
                        <Route exact path='/:id' component={Details} />
                        <Route exact path='/search/:q' component={Search} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
  }
}

export default App
