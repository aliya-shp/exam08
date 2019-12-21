import React, {Component} from 'react';
import {CATEGORIES} from "../constants";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import quote from "../axios-quotes";

class AddQuote extends Component {
    state = {
        category: Object.keys(CATEGORIES)[0],
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
                <Form onSubmit={this.formSubmitHandler}>
                    <FormGroup>
                        <Label for="category">Select a category</Label>
                        <Input type="select" name="category" id="category" value={this.state.category} onChange={this.quoteChangeHandler}>
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" value={this.state.author} onChange={this.quoteChangeHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Quote text</Label>
                        <Input type="textarea" name="text" id="text" value={this.state.text} onChange={this.quoteChangeHandler}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default AddQuote;