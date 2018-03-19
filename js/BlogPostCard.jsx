import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
text-decoration:none;
color:snow;`;

const BlogPostCard = props => {
  const { date, title, imgUrl, description, key, category } = props.post;
  return (
    <Wrapper
      to={`/fitnes-blog-saveti-za-zene/fitnes-tekst/${key}/${category}/${title
        .trim()
        .replace(/\s/g, '-')
        .replace(/\,/g, '')
        .replace(/\%/g, '')
        .toLowerCase()}`}
    >
      <div className="col l3 m6 s12 post-card">
        <h2>{title.slice(0, 55)}...</h2>
        <div className="post-card-image">
          <img
            src={imgUrl}
            alt="fitnes trener za zene novi sad"
            className="responsive-img"
          />
        </div>
        <p className="folw-text">{description.slice(0, 180)}...</p>
        <p className="blog-post-card-date">{date}</p>
      </div>
    </Wrapper>
  );
};

BlogPostCard.defaultProps = {
  post: {
    name: '',
    imgUrl: '',
    text: '',
    date: ''
  }
};

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired
};
export default BlogPostCard;
