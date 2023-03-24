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
    super(props)
    const sections = ["home", "intro", "career", "education", "contact"]
    const sectionsClass = {}
    sections.forEach(section => sectionsClass[section] = "")
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
              {/* <Navbar.Brand>Edgar Bautista</Navbar.Brand> */}
              {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                <Scrollspy onUpdate={(el) => this.currentElement(el)} offset={-250} items={this.state.sections}>
                  <Nav className="mr-auto">
                    <AnchorLink className="current-section nav-link" href="#home"><div className={this.state.sectionsClass["home"]}>Home</div></AnchorLink>
                    <AnchorLink className="nav-link" href="#intro"><div className={this.state.sectionsClass["intro"]}>Introduction</div></AnchorLink>
                    <AnchorLink className="nav-link" href="#career"><div className={this.state.sectionsClass["career"]}>Career</div></AnchorLink>
                    <AnchorLink className="nav-link" href="#education"><div className={this.state.sectionsClass["education"]}>Education</div></AnchorLink>
                    <AnchorLink className="nav-link" href="#contact"><div className={this.state.sectionsClass["contact"]}>Contact</div></AnchorLink>
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