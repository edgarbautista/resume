import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Scrollspy from 'react-scrollspy'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import _ from 'lodash'

class Navigation extends Component {
  constructor(props) {
    super(props);
    const sections = props.sections;
    const sectionsClass = {};
    sections.forEach(section => sectionsClass[section.name] = "");
    this.state = {
      sections,
      sectionsClass,
      currentClass: "current"
    }
  }

  currentElement = (el) => {
    if (!el) { return }
    const sectionsClass = _.mapValues(this.state.sectionsClass, () => "")
    sectionsClass[el.id] = "current-section"
    this.setState({ sectionsClass })
    this.props.currentEl(el)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Navbar collapseOnSelect id="nav-wrap" fixed="top" bg="light" expand="lg" variant="light">
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                <Scrollspy onUpdate={(el) => this.currentElement(el)} offset={-250} items={this.state.sections.map(section => section.name)}>
                  <Nav className="mr-auto">
                    {
                      this.state.sections.filter(section => !_.isEmpty(section.display)).map(section => {
                        return <AnchorLink className={`${section.name === this.state.sections[0] ? 'current-section ' : ''}nav-link`} href={`#${section.name}`}><div className={this.state.sectionsClass[section.name]}>{section.display}</div></AnchorLink>
                      })
                    }
                  </Nav>
                </Scrollspy>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Navigation;
