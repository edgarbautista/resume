import React, { Component } from 'react';
import { hasAnyProps } from '../helpers/props';
import profile from "../images/profile.jpeg";
import profilePh from "../images/profile_small.jpeg";
import Flip from 'react-reveal/Flip';
import ProfileIcon from './ProfileIcon';
import _ from 'lodash'
import CardGroup from 'react-bootstrap/CardGroup'
import CardLayout from './CardLayout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jump from 'react-reveal/Jump';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

class Intro extends Component {

   constructor(props) {
      super(props)
      const hidden = {}
      const focus = {}
      const display = {}
      const sizes = {}
      const activeCardColor = {}
      const counter= {}
      this.props.intro.about.bulletPoints.forEach((item, idx) => {
         activeCardColor[idx] = ""
         counter[idx] = 0
         focus[idx] = false
         item.items.forEach((innerItem, innerIdx) => {
            innerItem.forEach((obj, objIdx) => {
               const key = `${idx}+${innerIdx}+${objIdx}`
               hidden[key] = false
               display[key] = "none"
               sizes[key] = { original: obj.size, inView: obj.size }
            })
         })
      });
      this.state = {
         show: true,
         hidden,
         focus,
         display,
         showX: false,
         sizes,
         currentText: "",
         activeCardColor,
         counter,
         activeImage: 0,
         images: [profile, profilePh],
         stopCycle: false
      }
   }

   entranceLeftOrRight = (icon, idx, stringIdx, _itemObj) => {
      return (
          <div style={{ display: !this.state.hidden[stringIdx] ? "block" : "none" }}>
             {
                idx / 2 === 0 ?
                    <Flip left opposite when={this.props.currentEl === "intro" && this.state.show && !this.state.hidden[stringIdx]}>
                       {icon}
                    </Flip>
                    :
                    <Flip right opposite when={this.props.currentEl === "intro" && this.state.show && !this.state.hidden[stringIdx]}>
                       {icon}
                    </Flip>
             }
          </div>
      )
   }

   handleExitIconClick = () => {
      const focus = _.mapValues(this.state.focus, () => false)
      const showX = false
      const activeCardColor = _.mapValues(this.state.activeCardColor, () => { return { card: "", border: "", header: "card-header bg-transparent"} })
      this.setState({ focus, showX, activeCardColor })
   }

   handleIconClick = (text, index) => {
      const showX = true
      const counter = {...this.state.counter}
      counter[index] = counter[index] + 1
      const focus = _.mapValues(this.state.focus, () => false)
      focus[index] = true
      const activeCardColor = _.mapValues(this.state.activeCardColor, () => { return { card: "", border: "", header: "card-header bg-transparent"} })
      activeCardColor[index] =  { card: "", border: "danger", header: "card-header bg-transparent border-danger"}
      this.setState({ activeCardColor })
      this.setState({
         showX,
         currentText: text,
         counter,
         activeCardColor,
         focus
      })
   }

   onMouseEnterEvent = (index) => {
      if (this.state.focus[index]) {
         return
      }
      const activeCardColor = {...this.state.activeCardColor}
      Object.entries(this.state.focus).forEach(([key, value], idx) => {
         if (!value) {
            activeCardColor[key] = { card: "", border: "", header: "card-header bg-transparent"}
         }
      })
      activeCardColor[index] =  { card: "", border: "success", header: "card-header bg-transparent border-success"}
      this.setState({ activeCardColor })
   }

   onMouseExitEvent = (index) => {
      const activeCardColor = {...this.state.activeCardColor}
      Object.entries(this.state.focus).forEach(([key, value], idx) => {
         if (!value) {
            activeCardColor[key] = { card: "", border: "", header: "card-header bg-transparent"}
         }
      })
      this.setState({activeCardColor })
   }

   getText = () => {
      return this.state.currentText
   }

   getContent = (item, index) => {
      return (
          item.items.map((innerItem, innerIndex) => {
             return (
                 <div key={innerIndex} className="row" >
                    {
                       innerItem.map((itemObj, objIndex) => {
                          return (
                              <div key={objIndex} className="four column" >
                                 <div data-tip data-for={itemObj.icon + itemObj.color}>
                                    {this.entranceLeftOrRight(
                                        <ProfileIcon clickable={true} className="intro_icon" icon={itemObj.icon} color={itemObj.color} size={this.state.sizes[`${index}+${innerIndex}+${objIndex}`].inView} />, objIndex, `${index}+${innerIndex}+${objIndex}`, itemObj)}
                                 </div>
                              </div>
                          )

                       })
                    }
                 </div>)
          })

      )
   }

   render() {
      if (!hasAnyProps(this.props.intro)) return null
      const {about} = this.props.intro
      const height = 188;
      const width = 200;
      const placeHolder = <div style={ {width: width, height: height, backgroundColor: "grey"} } />
      return (
          <section id="intro">
             <h1 className="display-4">Introduction</h1>
             <Container fluid="xl">
                <Row fluid="true">
                   <Col xs={4} md={4} fluid="center">
                      <br/>
                      <Container>
                         <LazyLoadImage placeholderSrc={this.state.images[1].src} className="portrait profile-pic"
                                        src={this.state.images[this.state.activeImage]}
                                        alt={"Profile image"} height={height} width={width}/>
                      </Container>
                   </Col>
                   <Col lg={8} fluid="true">
                      <br/>
                      <Container>
                         <h4 className="text-justify">{about.header}</h4>
                      </Container>
                   </Col>
                </Row>
             </Container>
             <br/>
             <br/>
             <div id="show_details_card" style={{display: this.state.showX ? "block" : "none"}}
                  onClick={this.handleExitIconClick}><ProfileIcon clickable={true} className="intro_icon" icon="close"
                                                                  color="grey" size="5em"/></div>
             <br/>
             <br/>
             <div className="intro-cards">
                <CardGroup>
                   <Container><h4 className="text-justify"
                                  style={{display: this.state.showX ? "block" : "none"}}>{this.getText()}</h4></Container>
                   {about.bulletPoints.map((item, index) => <div key={index}
                                                                 onMouseEnter={() => this.onMouseEnterEvent(index)}
                                                                 onMouseLeave={() => this.onMouseExitEvent(index)}
                                                                 onClick={() => this.handleIconClick(item.text, index)}>
                      <Jump spy={this.state.counter[index]}>
                         <AnchorLink href="#show_details_card">
                            <CardLayout cardClass={this.state.activeCardColor[index]} header={item.header} a
                                        content={this.getContent(item, index)}/>
                         </AnchorLink>
                      </Jump></div>)}
                </CardGroup>
             </div>
          </section>
      );
   }
}

Intro.defaultProps = {
   intro: {profile: null, bio: [], about: {header: null, bulletPoints: []}}
};

export default Intro;
