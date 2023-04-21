import React from 'react';
import { Form, FormInput, FormGroup, Button} from "shards-react";

import {
    Row,
    Col,
} from 'antd'

import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBRow,
    MDBCol,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

import MenuBar from '../components/MenuBar';
import { getBookSearch, getBook, getAllBooks, getCategorySearch } from '../fetcher'
import {Rating} from "@mui/material";

class BooksPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookTitleQuery: '',
            categoryQuery: '',
            selectedBookTitle: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedBookDetails: null,
            booksResults: [],
        }
        this.handleBookTitleQueryChange = this.handleBookTitleQueryChange.bind(this)
        this.handleCategoryQueryChange = this.handleCategoryQueryChange.bind(this)
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToBookTitle = this.goToBookTitle.bind(this)
    }

    handleBookTitleQueryChange(event) {
        this.setState({ bookTitleQuery: event.target.value })
    }

    handleCategoryQueryChange(event) {
        this.setState({ categoryQuery: event.target.value })
    }

    goToBookTitle(title) {
        window.location = `/books?title=${title}`
    }

    updateSearchResults() {
        getBookSearch(this.state.bookTitleQuery, null, null).then(res => {
            this.setState({ booksResults: res.results })
        })
        getCategorySearch(this.state.categoryQuery, null, null).then(res => {
            this.setState({ booksResults: res.results })
        })
    }

    componentDidMount() {
        getBookSearch(this.state.bookTitleQuery, null, null).then(res => {
            this.setState({ booksResults: res.results })
        })

        getCategorySearch(this.state.categoryQuery, null, null).then(res => {
            this.setState({ booksResults: res.results })
        })

        getBook(this.state.selectedBookTitle).then(res => {
            this.setState({ selectedBookDetails: res.results[0] })
        })


        getAllBooks().then(res => {console.log(res.results)
            this.setState({ booksResults: res.results })
        })

    }

    render() {

        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Book Search</label>
                            <FormInput placeholder="Enter the Book Title" value={this.state.bookTitleQuery} onChange={this.handleBookTitleQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '3vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Category Filter</label>
                            <FormInput placeholder="Enter the Category" value={this.state.categoryQuery} onChange={this.handleCategoryQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '3vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                </Form>


                <div style={{ width: '80vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Book List</h3>
                    <MDBRow className='row-cols-1 row-cols-md-5 g-4' >
                    {this.state.booksResults.map((item,index) => {
                        return <MDBCol key={index}>
                            <MDBCard  >
                                <MDBCardImage src={item.image} position='top'/>
                                <MDBCardBody>
                                    <MDBCardTitle >{item.title}</MDBCardTitle>
                                    <MDBCardText >
                                        <text style={{ fontWeight: 'bold' }}>Rating:</text> {item.averageScore}<Rating name="size-large" defaultValue={item.averageScore} size="large" precision={0.1} readOnly/>
                                    </MDBCardText>
                                    <MDBCardText>
                                        <text style={{ fontWeight: 'bold' }}>Published Year:</text> {item.publishedYear}
                                    </MDBCardText>
                                    <MDBCardText>
                                        <text style={{ fontWeight: 'bold' }}>Publisher:</text> {item.publisher}
                                    </MDBCardText>
                                </MDBCardBody>

                                <MDBListGroup flush>
                                    <MDBListGroupItem className="mt-1 mb-0 text-muted" ><MDBCardLink href={`/authors?id=${item.authors}`}>{item.authors}</MDBCardLink></MDBListGroupItem>
                                    <MDBListGroupItem className="mt-1 mb-0 text-muted" ><MDBCardLink href={`/categories`}>{item.category}</MDBCardLink></MDBListGroupItem>
                                    <MDBListGroupItem className="mt-1 mb-0 text-muted" ><Button href={`/book?title=${item.title}`}>Learn More</Button></MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCard>
                        </MDBCol>
                    })}
                    </MDBRow>
                </div>
            </div>
        )
    }
}

export default BooksPage

