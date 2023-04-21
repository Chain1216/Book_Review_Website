import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle } from "shards-react";

import {
    Table,
    Row,
    Col,
    Divider,

} from 'antd'

import { getAuthorSearch, getAuthor} from '../fetcher'

import MenuBar from '../components/MenuBar';
const bookColumns = [
    {
        title: 'Author',
        dataIndex: 'authors',
        key: 'authors',
        sorter: (a, b) => a.author.localeCompare(b.author),
        render: (text, row) => <a href={`/authors?author=${row.authors}`}>{text}</a>
    },	
    {
        title: 'Google Book Link',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (text, row) => <a href={`${row.infoLink}`}>{text}</a>
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
        title: 'Published year',
        dataIndex: 'publishedYear',
        key: 'publishedYear',
        sorter: (a, b) => a.publishedYear - b.publishedYear
    },
    {
        title: 'Publisher',
        dataIndex: 'publisher',
        key: 'publisher',
        sorter: (a, b) => a.publisher.localeCompare(b.publisher)
    }
];

class AuthorsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorNameQuery: "",
            selectedAuthorName: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedAuthorDetails: null,
            selectedAuthorImage: null,
            authorsResults: [],
        }
        this.handleAuthorQueryChange = this.handleAuthorQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
    }

    handleAuthorQueryChange(event) {
        // TASK 10: update state variables appropriately. See handleAwayQueryChange(event) for reference
	this.setState({ authorNameQuery: event.target.value })
    }

     // goToAuthor(author) {
     //     window.location = `/authors?author=${author}`
     // }

    updateSearchResults() {
        //TASK 11: call getAuthorSearch and update authorsResults in state. See componentDidMount() for a hint
        getAuthorSearch(this.state.authorNameQuery, null, null).then(res => {
            this.setState({ authorsResults: res.results })
            this.setState({ selectedAuthorImage: res.selectedAuthorImage })
        })
    }

    componentDidMount() {
        getAuthorSearch(this.state.authorNameQuery, null, null).then(res => {
            this.setState({ authorsResults: res.results })
            this.setState({ selectedAuthorImage: res.selectedAuthorImage })
        })
        getAuthor(this.state.selectedAuthorName).then(res => {
            this.setState({ selectedAuthorDetails: res.results[0] })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                {/* The author name search block */}
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name of Author(s)</label>
                            <FormInput placeholder="Author name" value={this.state.authorQuery} onChange={this.handleAuthorQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '1vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>

                <Divider />
                {/* The search result by author */}
                <Table dataSource={this.state.authorsResults}  columns={bookColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}>
                </Table>
                <Divider />
                {/* The detailed search result of the author */}
                {this.state.selectedAuthorDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>{this.state.selectedAuthorDetails.authors}</CardTitle>

                                </Col>
				
                                <Col flex={2} style={{ textAlign: 'right' }}>
				{/*<img src={this.state.selectedAuthorImage} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>*/}
					                <form method="get" action="http://images.google.com/images">
                                        <input type="text" name="q" />
				 	                    <input type="submit" value="Author Photo (Google Image)" />
					                </form>
                                </Col>
				
                            </Row>
				{/*
			    <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <b>Books</b>: <i>{this.state.selectedAuthorDetails.books}</i>
                                </Col>
                            </Row>
			    */}
                            <br></br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <b># of Books</b>: {this.state.selectedAuthorDetails.numOfBooks}
                                </Col>
                            </Row>
                            <br></br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <b>Genres</b>: {this.state.selectedAuthorDetails.genres}
                                </Col>
                            </Row>
                            <br></br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <b>Wikipedia</b>: <a href={this.state.selectedAuthorDetails.wikipediaLink}>{this.state.selectedAuthorDetails.wikipediaLink}</a>
                                </Col>
                            </Row>
                            <br></br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    {/*
                                    <b>Wikipedia Image</b>: <a href={this.state.selectedAuthorImage}>{this.state.selectedAuthorImage}</a>
                                    */}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}
            </div>
        )
    }
}

export default AuthorsPage

