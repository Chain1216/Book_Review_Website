const config = require('./config.json')
const mysql = require('mysql');
require('express');
// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// Route 3 (handler)
async function all_authors(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want! 
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    // use this league encoding in your query to furnish the correct results

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        let pagesize = req.query.pagesize? req.query.pagesize : 10
	    let page1 = (req.query.page - 1) * pagesize + 1
	    let page2 = req.query.page * pagesize

        connection.query(`
            WITH indexedTable AS (                                                                                                              
	            SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*                                                                                            
    	        FROM (                                                                                                                          
                    SELECT *
        	        FROM BOOK                                                                                                                                                                                                               
                    ORDER BY authors) T, (SELECT @ROWNO := 0) T3                                                                                                     
	            ORDER BY ROWNO)                                                                                                                     
	        SELECT * FROM indexedTable                                                      
	        WHERE ROWNO >= ${page1} AND ROWNO <= ${page2}`, function (error, results) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });		
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT *  
        FROM BOOK 
        ORDER BY authors`, function (error, results) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function all_books(req, res) {
    connection.query(`
        select b.id, b.title, b.category, b.publishedYear,b.publisher, b.description, b.authors, b.ratingsCount, l.image, l.infoLink, l.previewLink, s.averageScore
        from BOOK b inner join Link l
                               on b.id = l.book_id
                    inner join
             (
                 select book_id, format(round(avg(score),1), 1) as averageScore
                 from Score
                 group by book_id
             ) s
             on b.id = s.book_id
        where b.title NOT LIKE '%,%' AND b.title NOT LIKE '%"%' AND b.title NOT LIKE '.%' AND b.title NOT LIKE ' %' AND b.title NOT LIKE '%''%'
        order by ratingsCount desc
            LIMIT  200
`, function (error, results) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}


// Route 5 (handler)
async function author(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
	connection.query(`
	    SELECT authors, CONCAT("<<", group_concat(DISTINCT title separator '>>, <<'), ">>") AS books, 
	           COUNT(title) AS numOfBooks, group_concat(DISTINCT category separator ', ') AS genres,
               CONCAT('https://en.wikipedia.org/wiki/', authors) AS wikipediaLink
               
	    FROM BOOK
        WHERE authors LIKE '%${req.query.author}%'`, function (error, results) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}


// Route 6 (handler)
async function book(req, res) {
    const title = req.query.title
    connection.query(`
        select b.id, b.title, b.category, b.publishedYear, b.publisher, b.authors, b.ratingsCount,b.description, l.image, l.previewLink, l.infoLink, s.averageScore
        from BOOK b inner join Link l
                               on b.id = l.book_id
                    inner join
             (
                 select book_id, format(round(avg(score),1), 1) as averageScore
                 from Score
                 group by book_id
             ) s
             on b.id = s.book_id
        where b.title like '%${title}%' AND b.title NOT LIKE '%,%' AND b.title NOT LIKE '%"%' AND b.title NOT LIKE '.%' AND b.title NOT LIKE ' %' AND b.title NOT LIKE '%''%' 
        order by ratingsCount desc
            LIMIT  100
    	    
            `, function (error, results) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function review(req,res){
    const title = req.query.title
    connection.query(`
        select distinct r.summary, r.text,  r.profileName, r.time
        from (select  b.id, b.ratingsCount
              from BOOK b
              where b.title = '${title}') b
                 join (select re.user_id, re.book_id, re.summary,re.text, re.time, u.profileName from Review re inner join
                                                                                                          (select user_id, profileName from User ) u on re.user_id = u.user_id
        ) r
                      on b.id = r.book_id
        order by r.time desc
            limit 15
            `, function (error, results) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 7 (handler)
async function search_authors(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    //let response = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&titles=')
    //let data = await response.text()
    //let link = data.substring(
    //    data.indexOf("source") + 9,
    //    data.lastIndexOf(".jpg") + 4);
    if (req.query.page && !isNaN(req.query.page)) {
        let pagesize = req.query.pagesize? req.query.pagesize : 10
        let page1 = (req.query.page - 1) * pagesize + 1
        let page2 = req.query.page * pagesize

        connection.query(`
	                    WITH indexedTable AS (                                                                                                            
    	                    SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*                                                                                      
    	                    FROM (SELECT *
        	                    FROM BOOK                                                                                                              
        	                    WHERE authors LIKE '%${req.query.author}%'
                                ORDER BY title) T, (SELECT @ROWNO := 0) T3                                                                   
    	                        ORDER BY ROWNO)                                                                                                               
	                    SELECT * FROM indexedTable                                                    
	                    WHERE ROWNO >= ${page1} AND ROWNO <= ${page2};
                        LIMIT 20`, function (error, results) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });             
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`
	                    SELECT *
	                    FROM BOOK JOIN Link ON id = book_id                                                                                                             
	                    WHERE authors LIKE '%${req.query.author}%' AND authors NOT LIKE '%,%' AND authors NOT LIKE '%"%' AND authors NOT LIKE '.%' AND authors NOT LIKE ' %'
	                    ORDER BY authors
	                    LIMIT 100`, function (error, results) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results})
            }
        })
    }
}


// Route 8 (handler)
async function search_books(req, res) {
    const title = req.query.title ? req.query.title : '%'
    connection.query(`
        select b.id, b.title, b.category, b.publishedYear,b.publisher, b.authors, b.ratingsCount, l.image, s.averageScore
        from BOOK b inner join Link l
                               on b.id = l.book_id
                    inner join
             (
                 select book_id, format(round(avg(score),1), 1) as averageScore
                 from Score
                 group by book_id
             ) s
             on b.id = s.book_id
        where b.title like '%${title}%' AND b.title NOT LIKE '%,%' AND b.title NOT LIKE '%"%' AND b.title NOT LIKE '.%' AND b.title NOT LIKE ' %' AND b.title NOT LIKE '%''%'
        order by ratingsCount desc
            LIMIT  100
    `, function (error, results) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function search_categories(req, res) {
    const category = req.query.category ? req.query.category : '%'
    connection.query(`

        select b.id, b.title, b.category, b.publishedYear,b.publisher, b.authors, b.ratingsCount, l.image, s.averageScore
        from BOOK b inner join Link l
                               on b.id = l.book_id
                    inner join
             (
                 select book_id, format(round(avg(score),1), 1) as averageScore
                 from Score
                 group by book_id
             ) s
             on b.id = s.book_id
        where b.category like '%${category}%' AND b.title NOT LIKE '%,%' AND b.title NOT LIKE '%"%' AND b.title NOT LIKE '.%' AND b.title NOT LIKE ' %' AND b.title NOT LIKE '%''%'
        order by ratingsCount desc
            LIMIT  100
        `, function (error, results) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}



async function sel_books(req, res) {
    connection.query(`
	SELECT BOOK.title, BOOK.authors, BOOK.category, BOOK.publishedyear, Link.image, BOOK.publisher, BOOK.ratingsCount, SUM(score) AS scores
    FROM BOOK
    JOIN Link
    ON  BOOK.id = Link.book_id
    JOIN Score
    ON BOOK.id = Score.book_id
    GROUP BY BOOK.id, BOOK.title, Link.infoLink, Link.image
    HAVING scores > 3000
    ORDER BY scores DESC;
`, function (error, results) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

async function top_review(req, res) {

	connection.query(`
	WITH highest_score AS (
        SELECT BOOK.id, BOOK.title,Link.image, SUM(Score.score) AS scores,COUNT(Review.text) num_review
     FROM BOOK
     JOIN Link
     ON  BOOK.id = Link.book_id
     JOIN Score
     ON BOOK.id = Score.book_id
     JOIN Review
     ON Score.user_id = Review.user_id
     GROUP BY BOOK.id, BOOK.title, Link.image
     ORDER BY scores DESC
     LIMIT 0,10
     )
     
     SELECT DISTINCT text
     FROM Review
     JOIN BOOK
     ON BOOK.id = Review.book_id
     WHERE book_id IN (SELECT id FROM highest_score)
     LIMIT 5;`, function (error, results) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
}

// Category Page

// Select top 10 popular books of the specific category based on the number of reviews and average score of each book
async function cat_top10(req, res) {
    const category = req.params.category ? req.params.category : 'Fiction'
    connection.query(`
    with category_info as
    (select distinct a.category, a.id, round(avg(score),1) as avg_score, count(*) as cnt_review
    from BOOK a
    inner join Score b
        on a.id = b.book_id
    inner join Review c
        on b.book_id = c.book_id
        and b.user_id = c.user_id
        and b.time = c.time
    where a.category = '${category}'
    group by a.category, a.id),
    -- select top 10 books for each category based on score and review
    category_top10_book as
    (select *, row_number()
     over(
         partition by category
         order by cnt_review desc, avg_score desc
         ) as rowNo
     from category_info)
    select distinct a.category, b.id, b.title, b.authors, a.avg_score, a.cnt_review, c.image
    from category_top10_book a
    inner join BOOK b
        on a.id = b.id
    inner join Link c
        on b.id = c.book_id
    where a.rowNo <= 10
    order by a.category, cnt_review desc, avg_score desc`, function (error, results) {
    
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } 

// User favorite Page (Your Library)

// Insert username and book id of the book that the user would like to save into database
    async function user_fav_book(req, res) {
    const email = req.body.email
    const id = req.body.id
    connection.query(`INSERT INTO User_fav (email, book_id) VALUES ('${email}', '${id}')`  
    , function (error, results) {
    
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } 
  
// Get all books that user saved earlier
    async function user_fav_book_all(req, res) {
    const email = req.params.email
    connection.query(`
    select distinct a.email, b.id, b.title, c.image
    from User_fav a
    inner join BOOK b
        on a.book_id = b.id
    inner join Link c
        on b.id = c.book_id
    where a.email = '${email}'
    `, function (error, results) {
    
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } 
// Get recommended books based on the authors of books that user saved
    async function user_fav_book_recommend_auth(req, res) {
        const email = req.params.email
        connection.query(`
    with User_fav_details as
    (select a.*, b.title, b.authors, b.category
     from User_fav a
     inner join BOOK b
     on a.book_id = b.id
     where email = '${email}'),
    same_authors as
    (select a.id, round(avg(score),1) as avg_score, count(*) as cnt_review
     from BOOK a
     inner join Score b
         on a.id = b.book_id
     inner join Review c
         on b.book_id = c.book_id
         and b.user_id = c.user_id
         and b.time = c.time
     inner join User_fav_details d
         on a.authors = d.authors
         and a.id <> d.book_id
     group by a.id
     order by cnt_review desc, avg_score desc LIMIT 10)
-- Choose top 5 from each table
    select distinct a.*, b.title, c.image
    from same_authors a
    inner join BOOK b
        on a.id = b.id
    inner join Link c
        on b.id = c.book_id
        `, function (error, results) {
        
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    } else if (results) {
                        res.json({ results: results })
                    }
            });
    } 
   // Get recommended books based on the categories of books that user saved
    async function user_fav_book_recommend_cat(req, res) {
        const email = req.params.email
        connection.query(`
    with User_fav_details as
    (select a.*, b.title, b.authors, b.category
     from User_fav a
     inner join BOOK b
     on a.book_id = b.id
     where email = '${email}'),
    same_catg as
    (select a.id, round(avg(score),1) as avg_score, count(*) as cnt_review
     from BOOK a
     inner join Score b
         on a.id = b.book_id
     inner join Review c
         on b.book_id = c.book_id
         and b.user_id = c.user_id
         and b.time = c.time
     inner join User_fav_details d
         on a.category = d.category
         and a.id <> d.book_id
     group by a.id
     order by cnt_review desc, avg_score desc LIMIT 10)
-- Choose top 5 from each table
    select distinct a.*, b.title, c.image
    from same_catg a
    inner join BOOK b
        on a.id = b.id
    inner join Link c
        on b.id = c.book_id
        `, function (error, results) {
        
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    } else if (results) {
                        res.json({ results: results })
                    }
            });
    } 

// Login and Sign up Page
   // Insert token, username and password tuple into user login table when user first registers
    async function user_reg(req, res) {
        const email = req.body.userName
        const password = req.body.password
        const token = email + '-' + password
        connection.query(`INSERT INTO User_login (email, password, token) VALUES ('${email}','${password}','${token}')`  
        , function (error, results) {
        
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    } else if (results) {
                        res.json({ results: results })
                    }
            });
    }
   // Select stored token from user login table to validate user prompt info
    async function user_val(req, res) {
        const email = req.query.email
        const password = req.query.password
        connection.query(`
        select token
        from User_login
        where email = '${email}'
        and password = '${password}'
        `, function (error, results) {
        
                    if (error) {
                        console.log(error)
                        res.json({ error: error })
                    } else if (results) {
                        res.json({ results: results })
                    }
            });
    } 
    

module.exports = {
    all_authors,
    all_books,
    author,
    book,
    review,
    search_authors,
    search_books,
    search_categories,
    sel_books,
    top_review,
    cat_top10,
    user_fav_book,
    user_fav_book_all,
    user_fav_book_recommend_auth,
    user_fav_book_recommend_cat,
    user_reg,
    user_val
}
