import React, {Component} from 'react';
import quote from "../axios-quotes";
import {Button, Card, CardBody, CardText, CardTitle} from "reactstrap";
import {FaRegEdit, FaRegWindowClose} from "react-icons/fa";
import {Link} from "react-router-dom";

class Quotes extends Component {
    state = {
        quotes: [],
    };

    async componentDidMount() {
        const response = await quote.get('/quotes.json');

        if (response.data) {
            this.setState({quotes: response.data});
        }
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.quotes).map(id => (
                    <Card>
                        <CardBody>
                            <CardTitle>{this.state.quotes[id].category}</CardTitle>
                            <CardText>{this.state.quotes[id].text}</CardText>
                            <CardText>{this.state.quotes[id].author}</CardText>
                            <Button tag={Link} to={"/quotes/" + id}>
                                <FaRegEdit />
                            </Button>
                            <Button>
                                <FaRegWindowClose />
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }
}

export default Quotes;