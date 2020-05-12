import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Nested extends Component {

    state = {}

    isOpen(index, inner, nestedInner) {
        console.log("ok..")
        const field = `${index}_${inner}_${nestedInner}`
        return this.state[field]
    }

    toggle = (index, inner, nestedInner) => {
        const field = `${index}_${inner}_${nestedInner}`
        this.setToggleState(field, !this.state[field])
    };

    setToggleState = (field, state) => {
        const newState = {}
        newState[field] = state
        this.setState(newState)
    }

    toDisplay = (item, index, inner, idx) => {
        this.toggle(index, inner, idx)
        const displayItems = this.state.displayItems || {}
        const display = item.section.listInfo && item.section.listInfo[idx]
        displayItems[idx] = (this.state[`${index}_${inner}_${idx}`]) ? display : null
        this.setState({ displayItems })
    }

    render() {
        if (!this.props.split || !this.props.split.leftItems || !this.props.split.rightItems) return null
        const split = this.props.split
        return (
            <div>
                {
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    {split.leftItems.map((item, idx) => {
                                        return this.getLeftSection(item, idx)
                                    })}
                                </Col>
                                <Col>
                                {split.rightItems.map((item, idx) => {
                                    return this.getRightSection(item, idx)
                                })}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        );
    }

    getLeftSection = (item, idx) => {
        return (
            <div key={idx}>
                <h1>{item.header}</h1>
                <h4>{item.subheader}</h4>
                <h5>{item.info}</h5>
                <hr></hr>
            </div>
        )
    }

    getRightSection = (item, index) => {
        return (
            <ul key={index}>
                <h1>{item.header}</h1>
                {item.items.map((listItem, idx) => {
                    return (
                        <div key={idx}>
                            <Collapsible trigger={<h2>{listItem.header}</h2>}>
                                <div>
                                <h5>{listItem.info}</h5><br/>
                                <li><p className="text-left">{listItem.text}</p></li><br/>
                                {
                                    (listItem.links) ? listItem.links.map((link, idxInner) => <a key={idxInner} href={link.item}  rel="noopener noreferrer" target="_blank">{link.name}<br/></a>) : null
                                }
                                </div>
                            </Collapsible>
                        </div>
                    )
                })
                }
            </ul>
        )
    }
}

Nested.defaultProps = {
    split: {}
};

export default Nested;
