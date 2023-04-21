import config from './config.json'

const getAllAuthors = async (page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/authors?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    });
    return res.json()
}

const getAllBooks = async (page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/books?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    });
    return res.json()
}

const getAuthor = async (authors) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/author?author=${authors}`, {
        method: 'GET',
    });
    return res.json()
}

// single book detailed page
const getBook = async (title) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/book?title=${title}`, {
        method: 'GET',
    });
    return res.json()
}

const getReview = async (title) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/review?title=${title}`, {
        method: 'GET',
    });
    return res.json()
}

const getAuthorSearch = async (author, page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/search/authors?author=${author}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    });
    return res.json()
}

const getBookSearch = async (title, page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/search/books?title=${title}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    });
    return res.json()
}

const getCategorySearch = async (category, page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/search/categories?category=${category}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    });
    return res.json()
}


const getSBooks = async (page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/sbooks?page=${page}&pagesize=${pagesize}`, {
        method: 'Get',
    });
    return res.json()

}

const getTopReview = async (page, pagesize) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/top_review?page=${page}&pagesize=${pagesize}`, {
        method: 'Get',
    });
    return res.json()

}

// Category page

const getCatTop10 = async (category) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/top_categories/${category}`, {
        method: 'GET',
    });
    return res.json()
}

// User favorite page

const insertUserFavBook = async (email,id) => {
    await fetch(`http://${config.server_host}:${config.server_port}/user_fav_book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            id: id
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        });
}

const getUserFavBookAll = async (email) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/user_fav_book_all/${email}`, {
        method: 'GET',
    });
    return res.json()
}

const getUserFavBookRecommendAuth = async (email) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/user_fav_book_recommend_auth/${email}`, {
        method: 'GET',
    });
    return res.json()
}

const getUserFavBookRecommendCat = async (email) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/user_fav_book_recommend_cat/${email}`, {
        method: 'GET',
    });
    return res.json()
}

// Login and Sign up page

const userRegister = async (userName,password) => {
    await fetch(`http://${config.server_host}:${config.server_port}/user_register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: userName,
            password: password
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        });
}

const getUserInfo = async (email, password) => {
    const res = await fetch(`http://${config.server_host}:${config.server_port}/user_val?email=${email}&password=${password}`, {
        method: 'GET',
    });
    return res.json()
}

export {
    getAllAuthors,
    getAllBooks,
    getAuthor,
    getBook,
    getReview,
    getAuthorSearch,
    getBookSearch,
    getCategorySearch,
    getSBooks,
    getTopReview,
    getCatTop10,
    insertUserFavBook,
    getUserFavBookAll,
    getUserFavBookRecommendAuth,
    getUserFavBookRecommendCat,
    userRegister,
    getUserInfo
}
