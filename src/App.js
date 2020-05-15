import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Intro from './components/Intro'
import Education from './components/Education'
import Contact from './components/Contact'
import Career from './components/Career'
import Navigation from './components/Navigation'
import { fetchCvData } from './services/cvService'
import { loadImages } from './helpers/imageHelper'
import Loader from './components/Loader'
import Container from 'react-bootstrap/Container'
import Zoom from 'react-reveal/Zoom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState(), loading: true, currentElementId: 'home', backgroundImages: [] };
  }

  defaultState = () => {
    return {
     components: {},
      data: {}
    }
  }

  fetchData = async () => {
    let data = {}
    let backgroundImages = []
    try {
      data = await fetchCvData()
      Promise.all(await loadImages(data.data.home.faces))
      Promise.all(await loadImages(data.data.backgroundImages))
      await new Promise((resolve) => setTimeout(resolve, data.data.waitTime || 3000))
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ ...data, loading: false, backgroundImages })
    }
  }

  componentDidMount = () => {
    this.fetchData();
  }

  currentEl = (el) => {
    this.setState({ currentElementId: el.id })
  }

  render() {
    return (this.state.loading) ? <Container><Loader color="#36D7B7" size={80} loading={this.state.loading} /></Container>:
    (
      <div className="App">
        {
          this.state.backgroundImages
        }
          <Navigation currentEl={this.currentEl} />
          <Zoom>
            <Home switchBackground={this.state.data.switchBackground} currentEl={this.state.currentElementId} home={this.state.data.home} images={this.state.data.backgroundImages} />
          </Zoom>
          <Intro intro={this.state.data.intro} currentEl={this.state.currentElementId} />
          <Career career={this.state.data.career} />
          <Education education={this.state.data.education} />
          <Contact contact={this.state.data.contact} />
      </div>
    );
  }
}

export default App;
