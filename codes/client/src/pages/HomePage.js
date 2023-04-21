import React from 'react';
import {
  Table
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllAuthors, getSBooks, getTopReview } from '../fetcher'
const sbookColumns = [
  {
    title: '',
    dataIndex: 'image',
    render:  (t, r) => <img src={`${r.image}`} />
 },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    //render: (text, row) => <a href={`/books?id=${row.id}`}>{text}</a>
  },
  {
    title: 'Author',
    dataIndex: 'authors',
    key: 'authors',
    sorter: (a, b) => a.authors.localeCompare(b.authors)
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sorter: (a, b) => a.category.localeCompare(b.category)
  },
  {
    title: 'Published year',
    dataIndex: 'publishedyear',
    key: 'publishedYear',
    sorter: (a, b) => a.publishedYear - b.publishedYear
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
    sorter: (a, b) => a.publisher.localeCompare(b.publisher)
  },
  {
    title: 'Scores',
    dataIndex: 'scores',
    key: 'Score',
    sorter: (a, b) => a.scores - b.scores
  }

];

const reviewColumns = [
  {
    title: '',
    dataIndex: 'text',
    key: 'text',
    sorter: (a, b) => a.text.localeCompare(b.text),
    //render: (text, row) => <a href={`/review?id=${row.id}`}>{text}</a>
    
  }

];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      reviewsResults: [],
      reviessPageNumber: 1,
      reviewsPageSize: 10,
      sbooksResults: [],
      pagination: null  
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToAuthor = this.goToAuthor.bind(this)
  }

  goToAuthor(author) {
    window.location = `/authors?author=${author}`
  }

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllAuthors in fetcher.js with the parameters page and pageSize set to null
    // then, authorsResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getAllAuthors(null, null, value).then(res => {
      this.setState({ authorsResults: res.results })
    })    
  }

  componentDidMount() {
    getAllAuthors(null, null, 'D1').then(res => {
      this.setState({ authorsResults: res.results })
    })


    getSBooks().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ sbooksResults: res.results })
    })

    getTopReview().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ reviewResults: res.results })
    })

  }

  render() {
    return (
      <div>

        <MenuBar />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Roboto:wght@300&family=Source+Sans+Pro:ital@1&display=swap" rel="stylesheet"></link>
        <div style={{fontSize: '20px',fontWeight: 'bold', fontFamily: 'Dancing Script,cursive', textAlign: 'center', width: '70vw', margin: '0 auto', marginTop: '5vh',  paddingTop: '100px', position: 'relative'}}>
          <p>Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.</p>
          <h8>--Charles W. Eliot</h8>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Selected Books</h3>
          <h8>What should I read next?</h8>
          

          <Table dataSource={this.state.sbooksResults} columns={sbookColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Book with most recent reviews</h3>
        <img style = {{widht: '300px', height: '700px'}} src={"https://i.harperapps.com/covers/9780261103344/y648.jpg"} alt="cp2"></img>
        <img style = {{widht: '300px', height: '700px', position:'absolute', left:'50%'}} src={"https://lcmbearfacts.com/wp-content/uploads/2015/04/the-hobbit-flat-cover.jpg"} alt="cp2"></img>
        <br></br>
        <br></br>
        <h3>Selected Reviews</h3>
        <Table style ={{fontStyle: 'italic', fontWeight: 'bold'}} dataSource={this.state.reviewResults} columns={reviewColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>


        <div style={{ textAlign: 'center', width: '70vw', margin: '0 auto', marginTop: '5vh',  paddingTop: '100px', position: 'relative' }}>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Roboto:wght@300&family=Source+Sans+Pro:ital@1&display=swap" rel="stylesheet"></link>
        <h3 style = {{ fontFamily: 'Dancing Script,sans-serif'}}>Get In Touch</h3>
        <a class="btn" style = {{textDecoration: 'underline'}} href="mailto:zhaoqinw@seas.upenn.edu">CONTACT US</a>
        <a class="btn" style = {{textDecoration: 'underline'}} href="https://github.com/SeisSparrow/CIS5500GroupProject">VIEW THE CODE IN GITHUB</a>
        <p style = {{fontSize: '15px', fontFamily: 'Dancing Script,sans-serif'}}>© CIS 550 Group Project, University of Pennsylvania,</p>
        <p style = {{fontSize: '20px', fontFamily: 'Dancing Script,sans-serif'}}>© By Zhen Zhang, Xinyue Zhang, Shuai Feng, Zhaoqin Wu,</p>
        </div>

        





      </div>
      


    )

  }
}

export default HomePage