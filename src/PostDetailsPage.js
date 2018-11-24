import React, { Component } from 'react';
import axios from 'axios';
import {
  Card,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import {
  withRouter,
} from 'react-router-dom';

import DesktopContainer from './DesktopContainer';

class HomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: { title: 'Testowy artykuł', content: 'To jest testowa treść', id: 1 },
    };
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    axios
      .get(`/api/posts/${postId}`)
      .then(({ data }) =>  this.setState({ post: data}))
  }
  
  render() {
    const { post } =  this.state;
    return (
      <DesktopContainer title={post.title}>
         <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row textAlign='center'>
              <Grid.Column>
                <p style={{ fontSize: '1.33em' }}>
                  {post.content}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </DesktopContainer>
    );
  }
}

export default withRouter(HomepageLayout);
