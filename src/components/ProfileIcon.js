import React, { Component } from 'react';
import { MdWork, MdDirectionsCar, MdMessage, MdClose, MdDesktopWindows } from 'react-icons/md';
import { FaJava, FaPython, FaLeaf, FaAngular, FaTerminal, FaReact, FaAws, FaGit, FaNode, FaStream, FaFilePdf } from 'react-icons/fa';
import { IoLogoJavascript, IoLogoNodejs } from 'react-icons/io'
import { DiRuby, DiDocker, DiJenkins, DiMysql, DiPostgresql } from 'react-icons/di'
import { GiCamel } from 'react-icons/gi'
import { IconContext } from "react-icons";

class ProfileIcon extends Component {

    getIcon = (icon) => {
        switch (this.props.icon) {
            case "work":
                return <MdWork />
            case "car":
                return <MdDirectionsCar />
            case "message":
                return <MdMessage />
            case "java":
                return <FaJava />
            case "python":
                return <FaPython />
            case "javascript":
                return <IoLogoJavascript />
            case "ruby":
                return <DiRuby />
            case "springboot":
                return <FaLeaf />
            case "angular":
                return <FaAngular />
            case "expressNode":
                return <IoLogoNodejs />
            case "bashTerminal":
                return <FaTerminal />
            case "apacheCamel":
                return <GiCamel />
            case "react":
                return <FaReact />
            case "aws":
                return <FaAws />
            case "docker":
                return <DiDocker />
            case "git":
                return <FaGit />
            case "jenkins":
                return <DiJenkins />
            case "node":
                return <FaNode />
            case "mysql":
                return <DiMysql />
            case "postgres":
                return <DiPostgresql />
            case "stream":
                return <FaStream />
            case "close":
                return <MdClose />
            case "desktop":
                return <MdDesktopWindows />
            case "pdf":
                return <FaFilePdf />
            default:
                return null
        }

    }

    render() {
        return (
        <IconContext.Provider value={{ color: this.props.color, size: this.props.size, className: this.props.className }}>
            {
                this.getIcon(this.props.icon)
            }
        </IconContext.Provider>)
    }
}

ProfileIcon.defaultProps = {
    icon: "work",
    color: "white",
    size: "1em",
    className: ""
};

export default ProfileIcon;