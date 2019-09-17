import React from "react";
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import queryString from 'query-string';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

function AppReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      loggedIn: false,
      username: undefined,
    }
  }

  if (action.type === 'LOGIN_SUCCESSFUL') {
    return Object.assign({}, state, {
      loggedIn: true,
      username: action.username,
    });
  }

  if (action.type === 'LOGOUT_SUCCESSFUL') {
    return Object.assign({}, state, {
      loggedIn: false,
      username: undefined,
    });
  }

  return state
}

const store = createStore(AppReducer);

function Index({ match }) {
  return <h2>Home</h2>;
}

// function Search(route) {
//   console.log(queryString.parse(route.location.search, {arrayFormat: 'bracket'}));
//   return <h2>Search Results</h2>;
// }

function SeriesBrowse(route) {
  console.log(route);
  console.log(queryString.parse(route.location.search, {arrayFormat: 'bracket'}));
  return <h2>Series</h2>;
}

function SeriesPage({ match }) {
  return <h2>Series {match.params.qsa_id}</h2>;
}

function AgenciesBrowse(route) {
  return <h2>Agencies</h2>;
}

function AgencyPage({ match }) {
  return <h2>Series {match.params.qsa_id}</h2>;
}

function LogIn(props) {
  return <div>{props.showLoginError? <span style={{color: 'red'}}> Failed to login</span> : []}<button onClick={props.onLogin}>Login</button></div>
}

function _Greeting(props) {
  if (props.state.loggedIn) {
    return <span>Hello {props.state.username} <button onClick={ props.onLogout }>Logout</button></span>
  } else {
    return <LogIn showLoginError={false} onLogin={ props.onLogin }></LogIn>
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps, state: state };
}

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch({type: 'LOGIN_SUCCESSFUL', username: "Fred"}),
  onLogout: () => dispatch({type: 'LOGOUT_SUCCESSFUL'}),
})

const Greeting = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Greeting);

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact activeStyle={{fontWeight: "bold"}}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/series" activeStyle={{fontWeight: "bold"}}>Series</NavLink>
              </li>
              <li>
                <NavLink to="/agencies/" activeStyle={{fontWeight: "bold"}}>Agencies</NavLink>
              </li>
              <li>
                <Greeting></Greeting>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/series" exact component={SeriesBrowse} />
          <Route path="/series/:qsa_id" component={SeriesPage} />
          <Route path="/agencies" exact component={AgenciesBrowse} />
          <Route path="/agencies/:qsa_id" component={AgencyPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default AppRouter;
