import React, {Component} from 'react';
import {CATEGORIES} from "../constants";
import quote from "../axios-quotes";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class EditQuote extends Component {
    state = {
        quote: null,
    };

    quoteEditHandler = e => this.setState({[e.target.name]: e.target.value});

    formEditHandler = async (e) => {
        e.preventDefault();

        const currentQuote = {
            category: this.state.category,
            author: this.state.author,
            text: this.state.text,
        };

        await quote.post('/quotes.json', currentQuote);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h2>Edit a quote</h2>
                <Form onSubmit={this.formEditHandler}>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="select" name="category" id="category" value={this.state.category} onChange={this.quoteEditHandler}>
                            {CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" value={this.state.author} onChange={this.quoteEditHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Quote text</Label>
                        <Input type="textarea" name="text" id="text" value={this.state.text} onChange={this.quoteEditHandler}/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default EditQuote;