import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import MenuBar from '../components/MenuBar';
import { getUserFavBookAll } from '../fetcher'
import { getUserFavBookRecommendAuth } from '../fetcher'
import { getUserFavBookRecommendCat } from '../fetcher'
import { insertUserFavBook } from '../fetcher'

const useStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: '#FFF',
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

class UserFavPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          name: '',
          userfavResults: [],
          userfavRecommendsAuth: [],
          userfavRecommendsCat: []
        }
    }
    
    componentDidMount() {
      // Parse username out from token
      const token_substr = JSON.parse(sessionStorage.getItem('token')).token.split('-')[0];
      this.setState({name: token_substr})
      // Get favorite books that user saved
      getUserFavBookAll(token_substr).then(res => {
        this.setState({ userfavResults: res.results })
      })
      // Recommend books based on authors of the books user saved
      getUserFavBookRecommendAuth(token_substr).then(res => {
        this.setState({ userfavRecommendsAuth: res.results })
      })
      // Recommend books based on categories of the books user saved
      getUserFavBookRecommendCat(token_substr).then(res => {
        this.setState({ userfavRecommendsCat: res.results })
      })
    }

    // Jump to single book page
    goToBookDetails(title) {
      window.location = `/book?title=${title}`
  }

   // Save username and book id into database when user clicks on save button
    saveUserFav(id) {
      const token_substr = JSON.parse(sessionStorage.getItem('token')).token.split('-')[0];
          insertUserFavBook(token_substr,id);
          window.location = `/userfav`
   }

    render() {
      const { classes } = this.props;

        return (

        <div>

            <MenuBar />
            <div style={{ width: '90vw', margin: '0 auto', marginTop: '2vh'}}>
              <h3 style={{fontFamily: 'Times New Roman',color: "#107bd3",fontSize: 25}}>
                You are now logged in as: {this.state.name}</h3>
            </div>
            
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
              <h3>Your Favorites</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.userfavResults.map((item,index) => (
                        <ImageListItem key={index}>
                            <img src={item.image} loading="lazy"/>
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
              <h3>Recommended from Authors You Like</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.userfavRecommendsAuth.map((item,index) => (
                        <ImageListItem key={index}>
                            <img src={item.image} loading="lazy"/>
                            <ImageListItemBar
                                title={item.avg_score}
                                subtitle={<span>{item.cnt_review} Reviews</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                <>
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                </>
                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
              <h3>Books You might also like</h3>
              <ImageList className={classes.imageList} cols={2.5} 
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.userfavRecommendsCat.map((item,index) => (
                        <ImageListItem key={index}>
                            <img src={item.image} loading="lazy"/>
                            <ImageListItemBar
                                title={item.avg_score}
                                subtitle={<span>{item.cnt_review} Reviews</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                <>
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                </>
                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

        </div>
        
        )
    }
}

export default withStyles(useStyles)(UserFavPage)

