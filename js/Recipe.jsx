import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { database, auth, googleAuthProvider } from './firebase';
import Header from './Header';
import ToolbarButton from './ToolbarButton';
import CommentBox from './CommentBox';
import map from 'lodash/map';
import filter from 'lodash/filter';
import $ from 'jquery';

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

class Recipe extends Component {
  constructor(props) {
    super();
    this.state = {
      openPost: props.post,
      postId: props.postId,
      currentUser: null,
      postKey: '',
      comment: '',
      commentBox: 'close',
      selectedElements: []
    };
    this.blogPostsCommentsRef = database.ref(
      `/cookPosts/${this.state.postId}/comments/`
    );
    this.toggleCommentBox = this.toggleCommentBox.bind(this);
    this.leaveComment = this.leaveComment.bind(this);
  }
  login() {
    auth.signInWithPopup(googleAuthProvider);
  }
  logout() {
    auth.signOut();
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
    this.blogPostsCommentsRef.push({
      comment: comment,
      user: this.state.currentUser.displayName
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

    let url = `fitnes-kuvar-zdrava-hrana/fitnes-recepti/${this.state.postId}/${post.category}/${post.title
      .replace(/\s+/g, '-')
      .toLowerCase()}`;
    this.setSeoTags(
      post.title,
      post.description,
      keyWords,
      url,
      post.imgUrl,
      post.date,
      post.ingrediants
    );

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

  setSeoTags(title, description, keyWords, url, image, date, ingrdediants) {
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
          "@type": "Recipe",
          "author": "Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic",
          "cookTime": "PT30M",
          "datePublished": "${date}",
          "description": "${description}",
          "image": "${image}",
          "recipeIngredient": ${ingrdediants},
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": "http://schema.org/Comment",
            "userInteractionCount": "${Math.floor(Math.random() * 1000) + 1}"
          },
          "name": "${title}",
          "nutrition": {
            "@type": "NutritionInformation",
            "calories": "${Math.floor(Math.random() * 300) + 1} calories",
            "fatContent": "${Math.floor(Math.random() * 10) + 1} grams fat"
          },
          "prepTime": "PT15M",
          "recipeInstructions": "${description}",
          "recipeYield": "1 loaf",
          "suitableForDiet": "http://schema.org/LowFatDiet"
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
      return (
        <div>
          <Header />
          <div className="component blog-post">
            <div className="container blog-post-body col s12">
              <div className="blog-post-title">
                <h1>{this.state.openPost.title}</h1>
              </div>
              <p className="flow-text">{this.state.openPost.description}</p>
              <div className="row">
                <div className="blog-post-img col l6 m6 s12">
                  <img
                    src={this.state.openPost.imgUrl}
                    alt="fitnes trener za zenr novi sad"
                    className="responsive-img recipe-img"
                  />
                </div>
                <div className="blog-post-ingrdediants col offset-1 l5 m5 s12">
                  {this.state.openPost.ingrediants.map(ingrediant => (
                    <p className="ingrdediant" key={ingrediant}>{ingrediant}</p>
                  ))}
                </div>
              </div>

            </div>

            <div className={this.state.commentBox}>
              <CommentBox leaveComment={this.leaveComment} />
            </div>
            <div>
              <ToolbarButton
                user={this.state.currentUser}
                login={this.login}
                logout={this.logout}
                toggleCommentBox={this.toggleCommentBox}
              />
            </div>
            <Comments comments={this.state.openPost.comments} />
          </div>
        </div>
      );
    }
    return <Header />;
  }
}

Recipe.propTypes = {
  postId: PropTypes.string.isRequired
};
export default Recipe;
