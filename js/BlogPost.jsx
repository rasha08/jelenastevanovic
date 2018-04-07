import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { database, auth, googleAuthProvider } from './firebase';
import Header from './Header';
import ToolbarButton from './ToolbarButton';
import CommentBox from './CommentBox';
import map from 'lodash/map';
import reverse from 'lodash/reverse';

const Comments = props => {
  if (props.comments) {
    let orderedComments = [];
    let keys = Object.keys(props.comments);

    map(props.comments, comment => {
      orderedComments.push(comment);
    });

    for (let i = 0; i < orderedComments.length; i++) {
      orderedComments[i].key = keys[i];
    }

    orderedComments = orderedComments.reverse();

    return (
      <div className="container">
        <h4 className="left-align">Komentari:</h4>
        {map(orderedComments, comment => (
          <div className="col s12 comment" key={comment.key}>
            <small className="comment-date">
              {comment.date} {comment.time}
            </small>
            <p className="col l12 m12 s12 flow-text">
              {comment.comment}
              {' '}
              <small className="right-align">{comment.user}</small>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return <div />;
};

class BlogPost extends Component {
  constructor(props) {
    super();

    this.state = {
      openPost: props.post,
      postId: props.postId,
      currentUser: null,
      comment: '',
      commentBox: 'close',
      selectedElements: []
    };
    this.blogPostsCommentsRef = database.ref(
      `/blogPosts/${props.postId}/comments/`
    );
    this.toggleCommentBox = this.toggleCommentBox.bind(this);
    this.leaveComment = this.leaveComment.bind(this);
    this.likeButtonToggle = this.likeButtonToggle.bind(this);
  }
  login() {
    auth.signInWithPopup(googleAuthProvider);
  }
  logout() {
    auth.signOut();
  }
  likeButtonToggle() {
    if (this.state.liked) {
      this.setState({
        liked: false
      });
    } else {
      this.setState({
        liked: true
      });
    }
  }
  toggleCommentBox() {
    if (this.state.commentBox === 'close') {
      this.setState({
        commentBox: 'open'
      });
    } else {
      this.setState({
        commentBox: 'close'
      });
    }
  }
  leaveComment(comment) {
    let fullDate = new Date();
    let date = fullDate.toLocaleDateString();
    let time = fullDate.toLocaleTimeString();

    this.blogPostsCommentsRef.push({
      comment: comment,
      user: this.state.currentUser.displayName,
      date,
      time
    });
    this.toggleCommentBox();
  }
  componentDidMount() {
    let post = this.state.openPost;
    let keyWords = `${post.title} ${post.description}`
      .toLowerCase()
      .replace(/-/g, '')
      .replace(/\"/g, '')
      .replace(/\:\)/g, '')
      .replace(/\./g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s+/g, ',')
      .replace(/\,,/, ',');

    this.setState({
      openPost: post
    });

    let url = `fitnes-blog-saveti-za-zene/fitnes-tekst/${this.state.postId}/${post.category}/${post.title
      .replace(/\s/g, '-')
      .replace(/\,/g, '')
      .replace(/\%/g, '')
      .toLowerCase()}`;
    this.setSeoTags(post.title, post.description, keyWords, url, post.imgUrl);

    auth.onAuthStateChanged(currentUser => {
      this.setState({
        currentUser
      });
    });
  }

  componentWillUnmount() {
    this.state.selectedElements.map(elem => elem.remove());
    $('html').find('script[type="application/ld+json"]').remove();
    window.prerenderReady = false;
  }

  setSeoTags(title, description, keyWords, url, image) {
    this.setMetaTitleTag(`${title} - Fitnes Trener Za Zene`);

    this.setMetaTag('name', 'description', description);

    this.setMetaTag('name', 'keywords', keyWords);

    this.setMetaTag('property', 'og:title', `${title} - Fitnes Trener Za Zene`);
    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag('property', 'og:description', description);
    this.setMetaTag(
      'property',
      'og:site_name',
      `${title} - Fitnes Trener Za Zene`
    );
    this.setMetaTag('property', 'og:locale', 'sr_RS');
    this.setMetaTag(
      'property',
      'og:article:author',
      'https://www.facebook.com/jelenastevanovic.rs'
    );
    this.setMetaTag('property', 'og:url', `http://jelenastevanovic.rs/${url}`);
    this.setMetaTag('property', 'og:image', image);
    this.setMetaTag('name', 'robots', 'index, follow');
    /* ############ START OF TWITER CARD ################# */
    this.setMetaTag('name', 'twitter:card', 'summary');
    this.setMetaTag('name', 'twitter:url', `http://jelenastevanovic.rs/${url}`);
    this.setMetaTag('name', 'twitter:title', title);
    this.setMetaTag('name', 'twitter:description', description);
    this.setMetaTag('name', 'twitter:image', image);
    this.setMetaTag('name', 'twitter:site', '@NS_FitnesTrener');
    this.setMetaTag('name', 'twitter:creator', '@NS_FitnesTrener');
    /* ############ END OF TWITER CARD ################# */

    /* ############ START OF GOOGLE RICH CARD ################# */
    $('head').append(`
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "Article",
          "author": "Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic",
          "interactionStatistic": [
            {
              "@type": "InteractionCounter",
              "interactionType": "http://schema.org/CommentAction",
              "userInteractionCount": "${Math.floor(Math.random() * 1000) + 1}"
            }
          ],
          "name": "${title}"
          "description": "${description}"
        }
      </script>
    `);
    /* ############ END OF GOOGLE RICH CARD ################# */
  }

  setMetaTitleTag(title) {
    document.title = title;
  }

  setMetaTag(tagType, tagName, content) {
    if ($(`meta[${tagType}="${tagName}"]`).attr('content')) {
      $(`meta[${tagType}="${tagName}"]`).attr('content', content);
    } else {
      $('head').append(`<meta ${tagType}="${tagName}" content="${content}">`);
    }

    this.state.selectedElements.push($(`meta[${tagType}="${tagName}"]`));
  }

  render() {
    if (this.state.openPost) {
      const index = this.state.openPost.text.indexOf('.') + 1;
      const end = this.state.openPost.text.length;
      return (
        <div>
          <Header />
          <div className="component blog-post">
            <div className="container blog-post-body col s12">
              <div className="blog-post-title">
                <h1>{this.state.openPost.title}</h1>
              </div>
              <p className="flow-text">
                {this.state.openPost.text.slice(0, index)}
              </p>
              <div className="blog-post-img">
                <img
                  src={this.state.openPost.imgUrl}
                  alt="personalni trener za zene novi sad"
                  className="responsive-img"
                />
              </div>
              <p className="flow-text">
                {this.state.openPost.text.slice(index, end)}
              </p>
            </div>
            <div className={this.state.commentBox}>
              <CommentBox leaveComment={this.leaveComment} />
            </div>
            <div className={this.state.liked}>
              <ToolbarButton
                user={this.state.currentUser}
                login={this.login}
                logout={this.logout}
                toggleCommentBox={this.toggleCommentBox}
                likeButtonToggle={this.likeButtonToggle}
              />
            </div>
            <Comments comments={this.state.openPost.comments} />
          </div>
        </div>
      );
    }
    return <div />;
  }
}

BlogPost.propTypes = {
  postId: PropTypes.string.isRequired
};
export default BlogPost;
