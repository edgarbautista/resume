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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState(), loading: true, currentElementId: 'home' };
  }

  defaultState = () => {
    return {
     components: {},
      data: {}
    }
  }

  fetchData = async () => {
    let data = {}
    try {
      data = await fetchCvData()
      await Promise.all(await loadImages(data.data.backgroundImages))
      await Promise.all(await loadImages(data.data.home.faces))
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({ ...data, loading: false })
    }
  }

  componentDidMount = () => {
    this.fetchData();
  }

  currentEl = (el) => {
    this.setState({ currentElementId: el.id })
  }

  render() {
    return (this.state.loading) ? null :
    (
      <div className="App">
        <Navigation currentEl={this.currentEl} />
        <Home home={this.state.data.home} images={this.state.data.backgroundImages} />
        <Intro intro={this.state.data.intro} currentEl={this.state.currentElementId} />
        <Career career={this.state.data.career} />
        <Education education={this.state.data.education} />
        <Contact contact={this.state.data.contact} />
      </div>
    );
  }
}

export default App;
