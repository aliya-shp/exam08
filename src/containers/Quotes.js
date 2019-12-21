import React, {Component} from 'react';
import quote from "../axios-quotes";

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
                
            </div>
        );
    }
}

export default Quotes;