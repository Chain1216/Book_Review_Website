import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import MenuBar from '../components/MenuBar';
import { getCatTop10 } from '../fetcher'
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

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoriesResults: [],
            catFictionBooks: [],
            catJFictionBooks: [],
            catReligionBooks: [],
            catBiographyBooks: [],
            catHistoryBooks: [],
            catBusinessBooks: [],
            catCookingBooks: [],
            catHealthBooks: [],
            catJNonfictionBooks: [],
            catSpiritBooks: []
        }
    }

    componentDidMount() {
        // Get top 10 popular books from certain categories
        getCatTop10('Fiction').then(res => {
            this.setState({ catFictionBooks: res.results })
        })
        getCatTop10('Juvenile Fiction').then(res => {
            this.setState({ catJFictionBooks: res.results })
        })
        getCatTop10('Religion').then(res => {
            this.setState({ catReligionBooks: res.results })
        })
        getCatTop10('Biography & Autobiography').then(res => {
            this.setState({ catBiographyBooks: res.results })
        })
        getCatTop10('History').then(res => {
            this.setState({ catHistoryBooks: res.results })
        })
        getCatTop10('Business & Economics').then(res => {
            this.setState({ catBusinessBooks: res.results })
        })
        getCatTop10('Cooking').then(res => {
            this.setState({ catCookingBooks: res.results })
        })
        getCatTop10('Health & Fitness').then(res => {
            this.setState({ catHealthBooks: res.results })
        })
        getCatTop10('Juvenile Nonfiction').then(res => {
            this.setState({ catJNonfictionBooks: res.results })
        })
        getCatTop10('Body, Mind & Spirit').then(res => {
            this.setState({ catSpiritBooks: res.results })
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
            
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Fiction</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catFictionBooks.map((item,index) => (
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
                <h3>Juvenile Fiction</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catJFictionBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Religion</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catReligionBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Biography & Autobiography</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catBiographyBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>History</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catHistoryBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Business & Economics</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catBusinessBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Cooking</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catCookingBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Health & Fitness</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catHealthBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Juvenile Nonfiction</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catJNonfictionBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

                                }
                             />
                        </ImageListItem>
                    ))}
                 </ImageList>
            </div>

            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                <h3>Body, Mind & Spirit</h3>
                <ImageList className={classes.imageList} cols={2.5}   
                sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)) !important",
                    gridAutoColumns: "minmax(200px, 1fr)",
                    overflowX:'scroll'
                }}>
                    {this.state.catSpiritBooks.map((item,index) => (
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
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} onClick={() => {this.saveUserFav(item.id)}}/>
                                        <InfoIcon className={classes.title} onClick={() => {this.goToBookDetails(item.title)}}/>
                                    </IconButton>

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

export default withStyles(useStyles)(CategoriesPage)

