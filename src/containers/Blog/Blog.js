import React, { Component } from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
//import NewPost from ;
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {


    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post", 
                                hash: '#submit',
                                search: '?quick-submit=true'}}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" component={AsyncNewPost}/>
                    <Route path="/" component={Posts}/>
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>

            </div>
        );
    }
}

export default Blog;