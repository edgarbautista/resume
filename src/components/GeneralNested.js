import React, { Component } from 'react';
import Nested from './Nested'
import { hasAnyProps } from '../helpers/props';

class GeneralNested extends Component {
  render() {
    if(!hasAnyProps(this.props.general)) return null
    const {bio, about, header, id, className} = this.props.general
    return (
      <section id={id}>
          <h3>{header}</h3>
         <div>
         <h4 className={className}><b>{about.header}</b></h4>
             <Nested nested={bio} ></Nested>
         </div>

   </section>
    );
  }
}

GeneralNested.defaultProps = {
    general: { bio: [], about: { header: null, bulletPoints: [] }, 
    header: null, id: "general", className: "" }
};

export default GeneralNested;
