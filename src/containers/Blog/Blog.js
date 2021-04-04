import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId : null,
        error: false
    }


    componentDidMount() {
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
            .catch(err => this.setState({error: true}))
    }

    postClickHandler = id => {
        this.setState({selectedPostId: id})
    }


    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>

        if(!this.state.error) {
            posts = this.state.posts.map((post => {
                return <Post 
                    key={post.id} 
                    clicked={() => this.postClickHandler(post.id)} 
                    title={post.title} 
                    author={post.author} />
            }));
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;