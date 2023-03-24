import React, { Component } from 'react';
import './App.css';
import Home from './components/Home'
import Intro from './components/Intro'
import Education from './components/Education'
import Contact from './components/Contact'
import Career from './components/Career'
import Navigation from './components/Navigation'
import {fetchCvData} from './services/cvService'
import { loadImages } from './helpers/imageHelper'
import Loader from './components/Loader'
import Container from 'react-bootstrap/Container'
import Zoom from 'react-reveal/Zoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
// import getBrowserFingerprint from 'get-browser-fingerprint';
// import Cookies from 'js-cookie';
// import passwordHash from 'password-hash';
import CryptoJS from "crypto-js";

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

    encrypt = (data, secret) => {
        try {
            return CryptoJS.AES.encrypt(data, secret).toString();
        } catch(e) {
            console.log("encrypt error", e.message);
        }
    }

    decrypt = (data, secret) => {
        if (!secret || !data
            || (typeof data === "object" && Object.keys(data).length === 0)) return null;
        try{
            const bytes = CryptoJS.AES.decrypt(data, secret);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch(e) {
            console.log("Wrong password");
        }
    }

    decryptCvData = async () => {
        if (!this.state.password) return null;
        let data = this.state.encrypted;
        const response = this.decrypt(data, this.state.password);
        if (!response) {
            this.loggedIn = false;
            return null;
        }

        try {
            data = JSON.parse(response);
        } catch(e) {
            console.log(e.message);
        }

        if (!!data && !!data.data && typeof data.data === "object") {
            await Promise.all(await loadImages(data.data.home.faces));
            await Promise.all(await loadImages(data.data.backgroundImages));
            this.setState({ ...data, loading: false });
            this.loggedIn = true;
        }

        return data;
    }

    fetchData = async () => {
        let results = {};
        let backgroundImages = [];
        try {
            results = await fetchCvData();
        } catch (e) {
            console.log(e)
        } finally {
            this.setState({ encrypted: results.data, loading: false, backgroundImages })
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
        await this.decryptCvData();
    }

    currentEl = (el) => {
        this.setState({ currentElementId: el.id })
    }

    ResumeElements = () => {
        return (
            <>
                <Navigation currentEl={this.currentEl} />
                <Zoom>
                    <Home switchBackground={this.state.data.switchBackground} currentEl={this.state.currentElementId} home={this.state.data.home} images={this.state.data.backgroundImages} />
                </Zoom>
                <Zoom delay={500}>
                    <Intro intro={this.state.data.intro} currentEl={this.state.currentElementId} />
                </Zoom>
                <Career career={this.state.data.career} />
                <Education education={this.state.data.education} />
                <Contact contact={this.state.data.contact} />
            </>
        )
    }

    onSubmit = async (data) => {
        data.preventDefault();

        this.setState({loading: true});
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await this.decryptCvData();
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
                    {
                        this.state.backgroundImages
                    }
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
