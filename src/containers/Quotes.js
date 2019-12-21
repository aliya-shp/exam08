import React, {Component} from 'react';
import quote from "../axios-quotes";
import {Button, Card, CardBody, CardText, CardTitle, Nav, NavItem} from "reactstrap";
import {FaRegEdit, FaRegWindowClose} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {CATEGORIES} from "../constants";

import './Quotes.css';

const renderCategories = function () {
    return CATEGORIES.map((category) => (
      <NavItem key={category.id}>
          <NavLink to={`/quotes/${category.id}`}>{category.title}</NavLink>
      </NavItem>
    ))
};

const buildParams = categoryId => {
  if (categoryId) {
    return {
      params: {
        orderBy: `"category"`,
        equalTo: `"${categoryId}"`
      }
    }
  }

  return {}
};

class Quotes extends Component {
    state = {
        quotes: {},
    };

    fetchData () {
      const { categoryId } = this.props.match.params;
      quote.get('/quotes.json', buildParams(categoryId))
        .then((response) => {
          if (response.data) {
            this.setState({
              quotes: response.data,
              categoryId
            });
          }
        });
    };

    componentDidUpdate(prevProps, prevState) {
      if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
        this.fetchData();
      }
    };

    componentDidMount() {
        this.fetchData();
    };

    deleteQuote = async () => {
        const id = this.props.match.params.id;
        await quote.delete('/quotes/' + id + '.json');
        this.props.history.replace('/');
    };

    render() {
        const { quotes } = this.state;
        return (
            <div className="Quotes-Home">
                <div className="Categories">
                    <Nav vertical>
                        <NavItem key="all">
                          <NavLink to={'/quotes'}>All</NavLink>
                        </NavItem>
                        {renderCategories()}
                    </Nav>
                </div>
                <div className="Quotes">
                    {Object.keys(quotes).map(id => (
                      <Card className="Quote">
                          <CardBody>
                              <CardTitle>{quotes[id].category}</CardTitle>
                              <CardText>{quotes[id].text}</CardText>
                              <CardText>{quotes[id].author}</CardText>
                              <Button tag={Link} to={`/quotes/${id}/edit`}>
                                  <FaRegEdit />
                              </Button>
                              <Button onClick={this.deleteQuote}>
                                  <FaRegWindowClose />
                              </Button>
                          </CardBody>
                      </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default Quotes;
