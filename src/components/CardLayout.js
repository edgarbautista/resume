import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'

class CardLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render = () => {
        let { header, content, cardClass } = this.props
        return (
                <Card border={cardClass.border} bg={cardClass.card}>
                    <Card.Header className={cardClass.header} as="h3">{header}</Card.Header>
                    <Card.Body>
                        {content}
                    </Card.Body>
                </Card>
        )
    }
}

CardLayout.defaultProps = {
    header: "",
    content: null,
    cardClass: {},
    count: 0
};

export default CardLayout