import React, {Component} from 'react';
import {CATEGORIES} from "../constants";
import {Form, FormGroup, Input, Label} from "reactstrap";
import quote from "../axios-quotes";

class AddQuote extends Component {
    state = {
        category: CATEGORIES[0],
        author: '',
        text: '',
    };

    quoteChangeHandler = e => this.setState({[e.target.name]: e.target.value});

    formSubmitHandler = async (e) => {
        e.preventDefault();

        const newQuote = {
            category: this.state.category,
            author: this.state.author,
            text: this.state.text,
        };

        await quote.post('/quotes.json', newQuote);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h2>Submit new quote</h2>
                <Form>
                    <FormGroup>
                        <Label for="category">Select a category</Label>
                        <Input type="select" name="category" id="category">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Quote text</Label>
                        <Input type="textarea" name="text" id="text" />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default AddQuote;