import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import CategoriesPage from './pages/CategoriesPage';
import UserFavPage from './pages/UserFavPage';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import 'antd/dist/antd.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import AuthorsPage from './pages/AuthorsPage';
import SingleBookPage from "./pages/SingleBookPage";

ReactDOM.render(
  <div>
    <Router>
      <Switch>
      <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
		<Route exact
							path="/books"
							render={() => (
								<BooksPage />
							)}/>
	<Route exact
				 path="/book"
				 render={() => (
					 <SingleBookPage />
				 )}/>
        <Route exact
							path="/authors"
							render={() => (
								<AuthorsPage />
							)}/>
        <Route exact
							path="/categories"
							render={() => (
								<CategoriesPage />
							)}/>
		<Route exact
							path="/userfav"
							render={() => (
								<UserFavPage />
							)}/>
		<Route exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}/>
		<Route exact
							path="/register"
							render={() => (
								<Register />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

