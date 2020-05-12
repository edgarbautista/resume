import React, { Component } from 'react';
import Nested from './Nested'
import { hasAnyProps } from '../helpers/props';
import Container from 'react-bootstrap/Container'

class Education extends Component {
  render() {
   if(!hasAnyProps(this.props.education)) return null
    const {split} = this.props.education
    return (
      <section id="education">
         <h1 className="display-4">Education</h1>
         <blockquote className="blockquote">
           <p className="mb-0">{split.header}</p>
         </blockquote>
        <Container>
          <div className="row">
            <div className="main-col align-center">
              <Nested split={split} ></Nested>
            </div>
          </div>
        </Container>
   </section>
    );
  }
}

Education.defaultProps = {
    education: { profile: null, split: {}, about: { header: null, bulletPoints: [] } }
};

export default Education;
