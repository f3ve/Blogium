import React from 'react';
import PostsApiService from '../../services/posts-api-services';
import { Link } from 'react-router-dom';
import PostListItem from '../../components/postListItem/postListItem';
import Context from '../../context';
import './drafts.css';

class Drafts extends React.Component {
  static contextType = Context;

  state = {
    drafts: [],
  };

  componentDidMount() {
    this.context.clearError();
    PostsApiService.getDrafts()
      .then((drafts) => this.setState({ drafts }))
      .catch((err) => this.context.setError(err.error));
  }

  onSuccessfulDelete = () => {
    this.context.clearError();
    PostsApiService.getDrafts()
      .then((drafts) => this.setState({ drafts }))
      .catch((err) => this.context.setError(err.error));
  };

  renderDrafts() {
    return (
      <React.Fragment>
        <ul className='post-list'>
          {this.context.error !== null ? (
            <p className='error'>{this.context.error}</p>
          ) : null}
          {this.state.drafts.map((p) => {
            return (
              <PostListItem
                post={p}
                key={p.id}
                buttons={true}
                onSuccessfulDelete={this.onSuccessfulDelete}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <h2 className='yourDrafts'>Your Drafts</h2>
        {this.state.drafts.length === 0 ? (
          <p className='noDrafts'>
            No drafts.{' '}
            <Link className='clickMe' to='/editor'>
              Create a new post.
            </Link>
          </p>
        ) : (
          this.renderDrafts()
        )}
      </React.Fragment>
    );
  }
}

export default Drafts;
