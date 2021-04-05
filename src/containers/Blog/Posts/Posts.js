import React, {Component} from 'react';

import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost'
class Posts extends Component {
    
    state = {
        posts: []
    }


    componentDidMount() { 
        console.log(this.props);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (response.ok){
                    return response.json()
                } 
                return Promise.reject(response);
            })
            .then(json => {
                const posts = json.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Bakari'
                    }
                })
                return this.setState({posts: updatedPosts
                })
            })
            .catch(err => console.log(err))
    }

    postClickHandler = id => {
        //this.setState({selectedPostId: id})
        this.props.history.push({pathname: '/' + id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

        if(!this.state.error) {
            posts = this.state.posts.map((post => {
                return (
                    <Post
                        key={post.id} 
                        clicked={() => this.postClickHandler(post.id)} 
                        title={post.title} 
                        author={post.author}
                        {...this.props} />
                )
            }));
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                
                <Route path={this.props.match.url + ":id"} exact component={FullPost}></Route>
            </div>
        );
    }
}

export default Posts;