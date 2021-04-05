import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }


    deletePostHandler = id => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE',
        })
        .then(response => console.log('response' ,response))
    }

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if( this.props.match.params.id) {
            if(!this.state.loadedPost || this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id) {

            fetch('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
            .then(response => response.json())
            .then(data => this.setState({loadedPost: data}))
            }
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>
        }

        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={() => this.deletePostHandler(this.state.loadedPost.id)}>Delete</button>
                    </div>
                </div>
    
            );
        }
       
        return post;
    }
}

export default FullPost;