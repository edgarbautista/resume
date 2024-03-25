import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Intro from './components/Intro'
import Education from './components/Education'
import Contact from './components/Contact'
import Career from './components/Career'
import Navigation from './components/Navigation'
import {fetchCvData} from './services/cvService'
import Loader from './components/Loader'
import Container from 'react-bootstrap/Container'
import Zoom from 'react-reveal/Zoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.defaultState(), loading: true, currentElementId: 'home', backgroundImages: [], loggedIn: false };
    }

    defaultState = () => {
        return {
            components: {},
            data: {}
        }
    }

    setDecryptedState = async (data) => {
        if (!!data && !!data.data && typeof data.data === "object") {
            this.setState({ ...data, loading: false});
            this.loggedIn = true;
        } else {
            this.setState({ data: {}, loading: false });
        }
    }

    fetchData = async () => {
        try {
            return await fetchCvData(this.state.password);
        } catch (e) {
            console.log(e)
        }
    }

    decryptedCvData = async () => {
        const data = await this.fetchData();
        await this.setDecryptedState(data);
    }

    componentDidMount = async () => {
        await this.decryptedCvData();
    }

    currentEl = (el) => {
        this.setState({ currentElementId: el.id })
    }

    ResumeElements = () => {
        const navigationSections = [{name: "home", display: "Home"}, {name: "intro", display: "Introduction"}, {name: "career", display: "Career"}, {name: "education", display: "Education"}, {name: "contact", display: ""}];
        return (
            <>
                <Navigation currentEl={this.currentEl} sections={navigationSections} />
                <Zoom>
                    <Home  switchBackground={this.state.data.switchBackground} currentEl={this.state.currentElementId} home={this.state.data.home} images={this.state.data.backgroundImages} />
                    <Intro intro={this.state.data.intro} currentEl={this.state.currentElementId} />
                </Zoom>
                <Career career={this.state.data.career} />
                <Zoom>
                    <Education education={this.state.data.education} />
                </Zoom>
                <Contact contact={this.state.data.contact} />
            </>
        )
    }

    onSubmit = async (data) => {
        data.preventDefault();

        this.setState({loading: true});
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await this.decryptedCvData();
        this.setState({loading: false});
    }

    isLoggedIn = () => {
        return Object.keys(this.state.data).length > 0;
    }

    render() {

        if (this.state.loading) {
            return <Container><Loader color="#36D7B7" size={10} loading={this.state.loading} /></Container>;
        }

        if (!this.isLoggedIn()) {
            return <Login onChange={(data) => this.setState({ password: data.target.value })} onSubmit={this.onSubmit}/>
        }

        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/resume" element={this.ResumeElements()} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
