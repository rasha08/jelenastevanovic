import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
text-decoration:none;
color:snow;`;

const RecipeCard = props => {
  if (props.post.title) {
    let { key, category, title, imgUrl, description } = props.post;
    return (
      <Wrapper
        to={`/fitnes-kuvar-zdrava-hrana/fitnes-recepti/${key}/${category}/${title
          .trim()
          .replace(/\s/g, '-')
          .replace(/\,/g, '')
          .replace(/\%/g, '')
          .toLowerCase()}`}
      >
        <div
          className="col l5 m5 s11 row recipe-card recipe"
          style={{ background: `url(${imgUrl})`, backgroundSize: 'cover' }}
        >
          <div className="recipe-card-wrapper">
            <div className="col m10 s10 levitate">
              <h2>{title}</h2>
            </div>
            <div className="col s12 levitate">
              <p className="recipe-description">
                {description.slice(0, 250)}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return <div />;
  }
};

export default RecipeCard;
