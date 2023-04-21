import React from 'react';
import { Button, Card, CardBody, CardTitle} from "shards-react";

import {
    Row,
    Col,
    Rate
} from 'antd'

import {
    MDBCardTitle,
    MDBCardText,
    MDBCol
} from 'mdb-react-ui-kit';

import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import {getBook, getReview} from '../fetcher'
format('.3r');
class SingleBookPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedBookTitle: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedBookDetails: null,
            selectedBookReviews: [],
        }
    }

    componentDidMount() {
        getBook(this.state.selectedBookTitle).then(res => {
            this.setState({ selectedBookDetails: res.results[0] })
        })

        getReview(this.state.selectedBookTitle).then(res => {
            this.setState({ selectedBookReviews: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                {this.state.selectedBookDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='left'>
                                <a href={`/books`} >Click Here To Return</a>
                            </Row>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>{this.state.selectedBookDetails.title}</CardTitle>

                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <img src={this.state.selectedBookDetails.image} referrerpolicy="no-referrer" alt={null} style={{height:'35vh'}}/>

                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <h5><a href={`/authors?id=${this.state.selectedBookDetails.authors}`}> {this.state.selectedBookDetails.authors}</a></h5>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>

                                <Col>
                                    {this.state.selectedBookDetails.category}
                                </Col>
                                <Col>
                                    {this.state.selectedBookDetails.publishedYear}
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    <a href={this.state.selectedBookDetails.infoLink}>About this book:</a>{this.state.selectedBookDetails.description}
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left' >
                                <Button style={{ marginTop: '4vh' }} href={this.state.selectedBookDetails.previewLink}>Free sample</Button>
                            </Row>
                            <br>
                            </br>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h5>Ratings and Reviews</h5>
                                    <h8>{this.state.selectedBookDetails.averageScore}</h8><Rate disabled defaultValue={this.state.selectedBookDetails.averageScore} />
                                    <h8>{this.state.selectedBookDetails.ratingsCount} Reviews</h8>
                                </Col >
                            </Row>
                        </CardBody>


                        <CardBody>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h5>Review Highlights</h5>
                                    {this.state.selectedBookReviews.map((item,index) => (
                                        <MDBCol key={index}>

                                            <MDBCardTitle style={{color:'grey'}}>{item.profileName}</MDBCardTitle><text>comment on: {item.time}</text>

                                            <MDBCardText>{item.summary}</MDBCardText>
                                            <MDBCardText><h6>{item.text}</h6></MDBCardText>
                                        </MDBCol>
                                    ))}
                                </Col >
                            </Row>

                        </CardBody>

                    </Card>


                </div> : null}

            </div>

        )
    }
}

export default SingleBookPage
