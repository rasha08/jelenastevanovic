import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Services from './Services';
import Gallery from './Gallery';
import Blog from './Blog';
import BlogPost from './BlogPost';
import Cook from './Cook';
import Recipe from './Recipe';
import Contact from './Contact';
import Admin from './Admin';
import * as database from '../database.json';
import get from 'lodash/get';

const App = () => {
  const formatTitleSlug = post => {
    return post.title
      .trim()
      .replace(/\s/g, '-')
      .replace(/\,/g, '')
      .replace(/\%/g, '')
      .toLowerCase();
  };

  let blogPosts = database['blogPosts'];
  let cookPosts = database['cookPosts'];

  return (
    <div className="app">
      <div>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/personalni-treninzi-za-zene" component={Services} />
            <Route path="/galerija" component={Gallery} />
            <Route
              path="/fitnes-blog-i-saveti-za-zene"
              component={() => <Blog posts={blogPosts} />}
            />
            <Route path="/blog" component={() => <Blog posts={blogPosts} />} />
            <Route
              path="/fitnes-blog-saveti-za-zene/fitnes-tekst/:key"
              component={props => (
                <BlogPost
                  post={get(blogPosts, `${props.match.params.key}`)}
                  postId={props.match.params.key}
                />
              )}
            />
            <Route
              path="/post/:key"
              component={props => (
                <BlogPost
                  post={get(blogPosts, `${props.match.params.key}`)}
                  postId={props.match.params.key}
                />
              )}
            />
            <Route
              path="/fitnes-kuvar-i-zdrava-hrana"
              component={() => <Cook posts={cookPosts} />}
            />
            <Route path="/kuvar" component={() => <Cook posts={cookPosts} />} />
            <Route
              path="/recept/:id"
              component={props => (
                <Recipe
                  post={get(cookPosts, `${props.match.params.id}`)}
                  postId={props.match.params.id}
                />
              )}
            />
            <Route
              path="/fitnes-kuvar-zdrava-hrana/fitnes-recepti/:id"
              component={props => (
                <Recipe
                  post={get(cookPosts, `${props.match.params.id}`)}
                  postId={props.match.params.id}
                />
              )}
            />
            <Route path="/kontakt" component={Contact} />
            <Route path="/5eixaGWhWtZqCfTb6sFYE22ugs9uLlA4" component={Admin} />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default App;
