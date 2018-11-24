import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Responsive,
  Segment,
  Visibility,
  Header,
} from 'semantic-ui-react';

const HomepageHeading = ({ mobile, title }) => (
  <Container text>
    <Header
      as='h1'
      content={title}
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '1em',
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
  title: PropTypes.string,
}


class DesktopContainer extends Component {
  render() {
    const { children, title } = this.props

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
            vertical
          >
            <HomepageHeading title={title} />
          </Segment>
        </Visibility>
        <Container style={{ marginTop: '2em' }}>
          {children}
        </Container>
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer;