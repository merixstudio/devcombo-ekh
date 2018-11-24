import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';

import LoginPage from './LoginPage';
import PostsPage from './PostsPage';
import PostDetailsPage from './PostDetailsPage';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    axios.defaults.baseURL = 'http://localhost:3000';
  }

  onLogin(userData) {
    axios
      .post('/api/users/login', userData)
      .then(({ data }) => {
        axios.defaults.headers.common['login-token'] = data.token;

        this.props.history.replace('/');
      });
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Switch>
          <Route
            path="/login"
            render={() => <LoginPage onLogin={this.onLogin} />}
          />
           <Route
            path="/:postId"
            render={() => <PostDetailsPage />}
          />
          <Route
            path="/"
            render={() => <PostsPage />}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(Base);