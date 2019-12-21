import React, {Component} from 'react';
import {CATEGORIES} from "../constants";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import quote from "../axios-quotes";

class AddQuote extends Component {
    state = {
        category: CATEGORIES[0].id,
        author: '',
        text: '',
    };

    quoteChangeHandler = e => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    formSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(this.state)
        try {
            await quote.post('/quotes.json', {
                category: this.state.category,
                author: this.state.author,
                text: this.state.text,
            });
            this.props.history.push('/');
        } catch (e) {
            console.log(e.message);
        }
    };

    render() {
        return (
            <div>
                <h2>Submit new quote</h2>
                <Form onSubmit={this.formSubmitHandler}>
                    <FormGroup>
                        <Label for="category">Select a category</Label>
                        <Input
                          type="select"
                          name="category"
                          id="category"
                          value={this.state.category}
                          onChange={this.quoteChangeHandler}
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category.id} value={category.id}>{category.title}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input
                          type="text"
                          name="author"
                          id="author"
                          value={this.state.author}
                          onChange={this.quoteChangeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Quote text</Label>
                        <Input
                          type="textarea"
                          name="text"
                          id="text"
                          value={this.state.text}
                          onChange={this.quoteChangeHandler}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default AddQuote;
