import React, {Component} from 'react';
import {CATEGORIES} from "../constants";
import quote from "../axios-quotes";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const buildParams = function ({ quoteId }) {
    if (quoteId) {
        return {
            params: {
                orderBy: `"id"`,
                equalTo: `"${quoteId}"`
            }
        }
    }

    return {}
};

class EditQuote extends Component {
    state = {
        quote: null,
    };

    async componentDidMount() {
        const response = await quote.get('/quotes.json', buildParams(this.props.match.params));

        if (response.data) {
            this.setState({
                quote: response.data
            });
        }
    }

    quoteEditHandler = e => this.setState({
        [e.target.name]: e.target.value
    });

    formEditHandler = async (e) => {
        e.preventDefault();
        const { quoteId } = this.props.match.params;

        try {
            await quote.patch('/quotes.json', {
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
                <h2>Edit a quote</h2>
                <Form onSubmit={this.formEditHandler}>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                          type="select"
                          name="category"
                          id="category"
                          value={this.state.category}
                          onChange={this.quoteChangeHandler}
                        >
                            {CATEGORIES.map(category => (
                              <option key={category.id} value={category.id}>{category.title}</option>
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
