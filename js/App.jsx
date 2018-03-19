import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

const App = () => (
  <div className="app">
    <div>
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/personalni-treninzi-za-zene" component={Services} />
            <Route path="/galerija" component={Gallery} />
            <Route path="/fitnes-blog-i-saveti-za-zene" component={Blog} />
            <Route path="/blog" component={Blog} />
            <Route
              path="/fitnes-blog-saveti-za-zene/fitnes-tekst/:key"
              component={props => <BlogPost postId={props.match.params.key} />}
            />
            <Route
              path="/post/:key"
              component={props => <BlogPost postId={props.match.params.key} />}
            />
            <Route path="/fitnes-kuvar-i-zdrava-hrana" component={Cook} />
            <Route path="/kuvar" component={Cook} />
            <Route
              path="/recept/:id"
              component={props => <Recipe postId={props.match.params.id} />}
            />
            <Route path="/kontakt" component={Contact} />
            <Route path="/5eixaGWhWtZqCfTb6sFYE22ugs9uLlA4" component={Admin} />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  </div>
);
export default App;
