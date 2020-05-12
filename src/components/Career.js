import React, { Component } from 'react';
import { hasAnyProps } from '../helpers/props';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Events, animateScroll as scroll, scroller } from 'react-scroll'
import ProfileIcon from "./ProfileIcon"

class Career extends Component {
   componentDidMount() {
      Events.scrollEvent.register('begin', function () {
         console.log("begin", arguments);
      });
      Events.scrollEvent.register('end', function () {
         console.log("end", arguments);
      });
   }

   componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
   }

   scrollToTop() {
      scroll.scrollToTop();
   }
   scrollTo() {
      scroller.scrollTo('scroll-to-element', {
         duration: 800,
         delay: 0,
         smooth: 'easeInOutQuart'
      })
   }

   onInfoClick = () => {}

   scrollTo = (name, containerId) => {
      console.log(name, containerId)
      scroller.scrollTo(name, {
         duration: 800,
         delay: 0,
         smooth: 'easeInOutQuart',
         containerId: containerId
      })
   }

   render() {
      if (!hasAnyProps(this.props.career)) return null
      const career = this.props.career
      return (
            <section id="career">
               <h1 className="display-4">Career</h1>
               <blockquote className="blockquote">
                  <p className="mb-0">{career.header}</p>
               </blockquote>
               <VerticalTimeline className="vertical-time-line">
                  {
                     career.items.map((careerItem, idx) => {
                        return (
                           <VerticalTimelineElement
                              key={idx}
                              contentStyle={careerItem.timeLineProps.contentStyle}
                              contentArrowStyle={careerItem.timeLineProps.contentArrowStyle}
                              date={<h3>{careerItem.timeLineProps.date}</h3>}
                              iconStyle={careerItem.timeLineProps.iconStyle}
                              icon={<ProfileIcon icon={careerItem.timeLineProps.icon} />}
                              iconOnClick={this.onInfoClick}
                           >

                                    <h1>{careerItem.title}</h1>
                                    <h2>{careerItem.subtitle}</h2>

                                    <div>
                                       {/* <img className="profile-pic"  src={profile} alt="Profile" /> */}
                                       <h5 className={`${careerItem.body.className} text-left`}>{careerItem.body.text}</h5>
                                    </div>

                                    <div>
                                       <p><b>{careerItem.body.header}</b></p>
                                       <ul className="text-left circle">
                                          {careerItem.body.bulletPoints.map((item, index) => <li key={index}><h5>{item}</h5></li>)}
                                       </ul>
                                    </div>
                                    <div>
                                       <p><b>{careerItem.body.more.header}</b></p>
                                       <ul className="text-left circle">
                                          {careerItem.body.more.bulletPoints.map((item, index) => <li key={index}>{item}</li>)}
                                       </ul>
                                    </div>
                           </VerticalTimelineElement>
                        )
                     })
                  }
               </VerticalTimeline>
            </section>
      );
   }
}

Career.defaultProps = {
   career: { items: [], header: "" }
};

export default Career;
