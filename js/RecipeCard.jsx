import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
text-decoration:none;
color:snow;`;

const RecipeCard = props => {
  if (props.recipe.title) {
    return (
      <Wrapper
        to={`/fitnes-kuvar-zdrava-hrana/fitnes-recepti/${props.recipe.key}/${props.recipe.category}/${props.recipe.title
          .replace(/\s+/g, '-')
          .toLowerCase()}`}
      >
        <div
          className="col l5 m5 s11 row recipe-card"
          style={{ background: `url(${props.recipe.imgUrl})` }}
        >
          <div className="recipe-card-wrapper">
            <div className="col m10 s10 levitate">
              <h1>{props.recipe.title}</h1>
            </div>
            <div className="col s12 levitate">
              <p className="recipe-description">
                {props.recipe.description.slice(0, 250)}
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
