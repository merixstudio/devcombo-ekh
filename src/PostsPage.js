import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DesktopContainer from './DesktopContainer';

class HomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/posts')
      .then(({ data }) =>  this.setState({ items: data}))
  }

  render() {
    const { items  } =  this.state;
    return (
      <DesktopContainer title="Dev College">
        <Card.Group>
          {items.map(({ title, content, id}) => (
            <div style={{ width: '33.3%', padding: '10px' }}>
              <Card key={id}>
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Description>{content}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link to={`/${id}`} className="ui primary button">Details</Link>
                  </Card.Content>
              </Card>
            </div>
          ))}
        </Card.Group>
      </DesktopContainer>
    );
  }
}

export default HomepageLayout;
