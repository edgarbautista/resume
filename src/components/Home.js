import React, { Component } from 'react';
import { hasAnyProps } from '../helpers/props';
import { imageIndex, loadImagesSync } from '../helpers/imageHelper'

let timeInterval = 2000
let init = true
const isFirefox = typeof InstallTrigger !== 'undefined'

class Home extends Component {
   constructor(props) {
      super(props);
      this.tabOnFocus = true
      this.homeInView = true
      const display = this.props.images.map((_, idx) => (idx === 0) ? "block" : "none")
      const faceDisplay = this.props.home.faces.map((_, idx) => (idx === 0) ? "block" : "none")
      this.state = {
         currentImage: null,
         imageCount: 0,
         display,
         forwardDirection: true,
         intervalTimeIdx: 0,
         faceIndex: 0,
         faceDisplay,
      }

      this.randomImgIndex = this.props.images[Math.floor(Math.random() * this.props.images.length)]
      this.imageInterval = this.props.home.imageIntervals[0]
      this.executingSetTimeout = false
      this.runningBackgroundTimeout = true
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

   backgroundInterval = (sleepTime) => {
      const func = async () => {
         if (this.executingSetTimeout) { return }
         this.executingSetTimeout = true
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

         if (init) {
            const background = await loadImagesSync(this.props.images)
            const faces = await loadImagesSync(this.props.home.faces)
            let pending = true
            while(pending) {
               pending = background.find(img => !img.complete) || faces.find(img => !img.complete)
               await new Promise(resolve => setTimeout(resolve, 1000))
            } 
            init = false
         }

         if (this.tabOnFocus && this.homeInView ) {
            this.runningBackgroundTimeout = true
            setTimeout(() => { 
               this.executingSetTimeout = false
               func() 
            }, timeInterval);
         } else {
            this.runningBackgroundTimeout = false
         }

      }
      setTimeout(func, sleepTime || timeInterval);
   }

   onFocus = () => {
      this.tabOnFocus = true
      this.executingSetTimeout = false
      this.backgroundInterval()
   }

   onBlur = () => {
      this.tabOnFocus = false
   }

   componentDidMount = () => {
      window.addEventListener("focus", this.onFocus)
      window.addEventListener("blur", this.onBlur);
      this.backgroundInterval()
   }

   componentWillUnmount = () => {
      window.removeEventListener("focus", this.onFocus)
      window.removeEventListener("blur", this.onBlur)
      clearInterval(this.imageInterval)
   }

   headerBody = () => {
      if(!hasAnyProps(this.props.home)) return null
      const { name, title, about, preTitle } = this.props.home
      return (
      <div className="row banner container">
         <div className="col-sm-4">
            {/* {
               this.imageOverBackground()
            } */}
         </div>
         <div className="col-md-6" id="header_text">
            <h1 className="display-2">{name}</h1>
            <h2 className="display-4">{preTitle} <span>{title}</span> {about}</h2>
         </div>
         <div className="col-sm"></div>
      </div>
      )
   }

   imageOverBackground = () => {
      return this.props.home.faces.map((image, idx) => {
         return <img className="compute-face" alt="face compute" key={idx} style={{ display: `${this.state.faceDisplay[idx]}`}} src={`${image}`} />
      })
   }
   
   header = () => {
         return (
            <div>
               <header className="background" style={{ backgroundImage: `url(${this.randomImgIndex})` }}>
                  {
                     this.headerBody()
                  }
               </header>
            </div>
         )
   }

   render() {
      if (!hasAnyProps(this.props.home)) return null
      const { name } = this.props.home
      const { currentEl } = this.props
      if (currentEl !== "home" && this.homeInView) { this.homeInView = false }
      else if(this.tabOnFocus && !this.homeInView && !this.runningBackgroundTimeout) { 
         this.homeInView = true 
         this.executingSetTimeout = false
         this.backgroundInterval()
      }
      return (!name) ? null : <div id="home">
         {this.header()}
        </div>
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
   images: [],
   currentEl: "home",
   switchBackground: true
};

export default Home;