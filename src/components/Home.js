import React, { Component } from 'react';
import { hasAnyProps } from '../helpers/props';
import { imageIndex } from '../helpers/imageHelper'

let timeInterval = 1000

class Home extends Component {
   constructor(props) {
      super(props);
      const display = this.props.images.map((_, idx) => (idx === 0) ? "block" : "none")
      const faceDisplay = this.props.home.faces.map((_, idx) => (idx === 0) ? "block" : "none")
      this.state = {
         currentImage: null,
         imageCount: 0,
         display,
         forwardDirection: true,
         intervalTimeIdx: 0,
         faceIndex: 0,
         faceDisplay
      }

      this.imageInterval = this.props.home.imageIntervals[0]
   }

   getImageIndex = (idx) => {
      return imageIndex({
         direction: this.state.forwardDirection,
         size: this.props.images.length - 1,
         currentIdx:  idx || this.state.imageCount
      })
   }

   getFaceImageIndex = (idx) => {
      return imageIndex({
         direction: this.state.forwardDirection,
         size: this.props.home.faces.length - 1,
         currentIdx:  idx || this.state.faceIndex
      })
   }

   backgroundInterval = () => {
      const func = async () => {
         const imageIdxDirection = this.getImageIndex()
         const imageCount = imageIdxDirection.index
         const currentDirection = this.state.forwardDirection
         const forwardDirection = imageIdxDirection.direction
         let intervalTimeIdx = this.state.intervalTimeIdx
         if (currentDirection !== forwardDirection) {
            intervalTimeIdx = this.state.intervalTimeIdx >= this.props.home.imageIntervals.length - 1 ? 0 : this.state.intervalTimeIdx + 1
            timeInterval = this.props.home.imageIntervals[intervalTimeIdx]
         }

         const faceIndex = this.getFaceImageIndex().index
         const faceDisplay = this.props.home.faces.map((_item, idx) => {
            return (idx === faceIndex) ? "block" : "none"
         })
         const display = this.state.display.map((_item, idx) => {
            return (idx === imageCount) ? "block" : "none"
         })
         this.setState({
            currentImage: this.props.images[this.state.imageCount],
            imageCount,
            forwardDirection,
            display,
            intervalTimeIdx,
            faceDisplay,
            faceIndex
         })
         setTimeout(func, timeInterval);
      }
      setTimeout(func, timeInterval);
   }

   componentDidMount = () => {
      this.backgroundInterval()
   }

   componentWillUnmount = () => {
      clearInterval(this.imageInterval)
   }

   headerBody = () => {
      if(!hasAnyProps(this.props.home)) return null
      const { name, title, about, preTitle } = this.props.home
      return (
      <div className="row banner container">
         <div className="col-lg" id="image_here">
            {
               this.imageOverBackground()
            }
         </div>
         <div className="col-lg" id="header_text">
            <h1 className="display-2">{name}</h1>
            <h2 className="display-4">{preTitle} <span>{title}</span> {about}</h2>
         </div>
      </div>
      )
   }

   imageOverBackground = () => {
      return this.props.home.faces.map((image, idx) => {
         return <img alt="face compute" key={idx} style={{ display: `${this.state.faceDisplay[idx]}`}} src={`${image}`} />
      })
   }
   
   header = () => {
      return this.props.images.map((_image, idx) => {
         return (<header key={idx} style={{ display: `${this.state.display[idx]}`, backgroundImage: `url(${this.props.images[idx]})` }}>
            {
               this.headerBody()
            }
         </header>)
      })
   }

   render() {
      if (!hasAnyProps(this.props.home)) return null
      const { name } = this.props.home
      return (!name) ? null : <div id="home">{this.header()}</div>
   }
}

Home.defaultProps = {
   home: {
      name: null,
      preTitle: null,
      title: null,
      about: null,
      media: null,
      imageIntervals: [timeInterval],
      faces: []
   },
   images: []
};

export default Home;