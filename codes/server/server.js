const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); 

// Route 3 - register as GET 
app.get('/authors', routes.all_authors)

// Route 4 - register as GET 
app.get('/books', routes.all_books)

// Route 5 - register as GET 
app.get('/author', routes.author)

// Route 6 - register as GET 
app.get('/book', routes.book)

app.get('/review', routes.review)

// Route 7 - register as GET 
app.get('/search/authors', routes.search_authors)

// Route 8 - register as GET 
app.get('/search/books', routes.search_books)

app.get('/search/categories', routes.search_categories)

app.get('/sbooks', routes.sel_books)

app.get('/top_review', routes.top_review)

// Route Top Categories - register as GET 
app.get('/top_categories/:category', routes.cat_top10)

// Route insert user fav book - register as POST 
app.post('/user_fav_book', routes.user_fav_book)

// Route user fav book all - register as GET 
app.get('/user_fav_book_all/:email', routes.user_fav_book_all)

// Route recommended books by authors - register as GET 
app.get('/user_fav_book_recommend_auth/:email', routes.user_fav_book_recommend_auth)

// Route recommended books by categories - register as GET 
app.get('/user_fav_book_recommend_cat/:email', routes.user_fav_book_recommend_cat)

// Login Page and Sign up Page
// Route user register - register as POST
app.post('/user_register', routes.user_reg)

// Route user validation - register as GET 
app.get('/user_val', routes.user_val)




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
