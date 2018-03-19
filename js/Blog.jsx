import React, { Component } from 'react';
import { database } from './firebase';
import map from 'lodash/map';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';
import BlogPostCard from './BlogPostCard';
import Loader from './Loader';
import $ from 'jquery';

const Wrapper = styled(Link)`
text-decoration:none;
color:snow;`;

const SideMenu = props => (
  <div className={props.toggle}>
    <div className="workout-posts-menu">
      {props.workoutPosts.map(post => (
        <div key={post.key}>
          <Wrapper
            to={`/fitnes-blog-saveti-za-zene/fitnes-tekst/${post.key}/${post.category}/${post.title
              .trim()
              .replace(/\s/g, '-')
              .replace(/\,/g, '')
              .replace(/\%/g, '')
              .toLowerCase()}`}
          >
            <p className="flow-text" key={post.key}>{post.title}</p>
          </Wrapper>
        </div>
      ))}
    </div>
  </div>
);

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      openPost: null,
      workoutPosts: [],
      healthPosts: [],
      foodPosts: [],
      postsInSideMenu: [],
      toggle: 'closed',
      selectedElements: []
    };
    this.blogPostsRef = database.ref('/blogPosts');
  }
  componentDidMount() {
    this.blogPostsRef.on('value', snapshot => {
      let posts = snapshot.val();
      let keys = Object.keys(posts);
      let postsArray = [];
      let keyWords = [];

      map(posts, post => {
        postsArray.push(post);
        keyWords.push(post.title.toLowerCase());
      });

      for (let i = 0; i < postsArray.length; i++) {
        postsArray[i].key = keys[i];
      }

      this.setState({
        posts: postsArray,
        workoutPosts: postsArray
          .filter(post => post.category === 'vežbanje')
          .reverse(),
        healthPosts: postsArray
          .filter(post => post.category === 'zdravlje')
          .reverse(),
        foodPosts: postsArray
          .filter(post => post.category === 'hrana')
          .reverse()
      });

      this.setMetaTag(
        'name',
        'keywords',
        keyWords
          .reduce((prev, curr) => prev + ' ' + curr)
          .replace(/-/g, '')
          .replace(/\"/g, '')
          .replace(/\:\)/g, '')
          .replace(/\./g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s+/g, ',')
          .replace(/\,,/, ',')
      );

      window.prerenderReady = true;
      this.setSeoTags();
    });
  }
  componentWillUnmount() {
    this.state.selectedElements.map(elem => elem.remove());
    $('html').find('script[type="application/ld+json"]').remove();
    window.prerenderReady = false;
  }

  toggleMenus(param) {
    if (this.state.toggle === 'closed') {
      this.setState({
        toggle: 'open',
        postsInSideMenu: this.state[param]
      });
    } else {
      this.setState({
        toggle: 'closed'
      });
    }
  }

  setSeoTags() {
    this.setMetaTitleTag(
      'Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic'
    );

    this.setMetaTag(
      'name',
      'description',
      'Najnoviji tesktovi i odgovori na pitanja: kako napredovati u terertani, kako brzo smrsati, dijete za ravan stomak, lako do trbusnjaka, zatezanje zadnjicem, kako se resiti celulita.'
    );

    this.setMetaTag(
      'property',
      'og:title',
      'Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic'
    );
    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag(
      'property',
      'og:description',
      'Najnoviji tesktovi i odgovori na pitanja: kako napredovati u terertani, kako brzo smrsati, dijete za ravan stomak, lako do trbusnjaka, zatezanje zadnjicem, kako se resiti celulita.'
    );
    this.setMetaTag(
      'property',
      'og:site_name',
      'Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic'
    );
    this.setMetaTag('property', 'og:locale', 'sr_RS');
    this.setMetaTag(
      'property',
      'og:article:author',
      'https://www.facebook.com/jelenastevanovic.rs'
    );
    this.setMetaTag(
      'property',
      'og:url',
      'http://jelenastevanovic.rs/fitnes-blog-i-saveti-za-zene'
    );
    this.setMetaTag(
      'property',
      'og:image',
      'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg'
    );
    this.setMetaTag('name', 'robots', 'index, follow');
    /* ############ START OF TWITER CARD ################# */
    this.setMetaTag('name', 'twitter:card', 'summary');
    this.setMetaTag(
      'name',
      'twitter:url',
      'http://jelenastevanovic.rs/fitnes-blog-i-saveti-za-zene'
    );
    this.setMetaTag(
      'name',
      'twitter:title',
      'Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic'
    );
    this.setMetaTag(
      'name',
      'twitter:description',
      'Najnoviji tesktovi i odgovori na pitanja: kako napredovati u terertani, kako brzo smrsati, dijete za ravan stomak, lako do trbusnjaka, zatezanje zadnjicem, kako se resiti celulita.'
    );
    this.setMetaTag(
      'name',
      'twitter:image',
      'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg'
    );
    this.setMetaTag('name', 'twitter:site', '@NS_FitnesTrener');
    this.setMetaTag('name', 'twitter:creator', '@NS_FitnesTrener');
    /* ############ END OF TWITER CARD ################# */

    /* ############ START OF GOOGLE RICH CARD ################# */
    $('head').append(`
      <script type="application/ld+json">
        {
          "@context": "http://schema.org",
          "@type": "LocalBusiness",
          "url": "'http://jelenastevanovic.rs/fitnes-blog-i-saveti-za-zene'",
          "logo": "http://res.cloudinary.com/dgq2ohvtq/image/upload/v1496691641/logo_vuihpz.png",
          "hasMap": "https://www.google.rs/maps/place/MissFit/@45.2474953,19.7985349,14z/data=!4m8!1m2!2m1!1steretana+missfit!3m4!1s0x475b1022f83f5dfb:0xf10128ef0eedf02a!8m2!3d45.238835!4d19.827393",
          "email": "mailto:stevanovich.jelena(at)mail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Novi Sad",
            "addressRegion": "Srbija",
            "postalCode":"21000",
            "streetAddress": "8 Banovic Strahinje"
          },
          "description": "Najnoviji tesktovi i odgovori na pitanja: kako napredovati u terertani, kako brzo smrsati, dijete za ravan stomak, lako do trbusnjaka, zatezanje zadnjicem, kako se resiti celulita.",
          "name": "Fitness Blog Za Zene - Personalni Trener Jelena Stevanovic",
          "telephone": "+381643244314",
          "openingHours": "Mo,Tu,We,Th,Fr 06:00-23:00",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "44.8113172",
            "longitude": "20.4630735,17z"
          },
          "sameAs" : [
            "https://www.facebook.com/pg/jelenastevanovic.rs",
            "https://twitter.com/NS_FitnesTrener",
            "http://personalni-trener.blogspot.rs"
          ],
          "image": "http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg",
          "priceRange" : "$5 - $15",
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
    if (this.state.posts && this.state.posts.length > 0) {
      let orderedPost = [];
      map(this.state.posts, post => orderedPost.unshift(post));
      return (
        <div>
          <Header />
          <div className="component blog">
            <div className="row">
              <div className="col s1">
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => {
                    this.toggleMenus('workoutPosts');
                  }}
                >
                  Vežbanje
                </button>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => {
                    this.toggleMenus('healthPosts');
                  }}
                >
                  Zdravlje
                </button>
                <button
                  className="btn waves-effect waves-light"
                  onClick={() => {
                    this.toggleMenus('foodPosts');
                  }}
                >
                  Hrana
                </button>
              </div>
              <SideMenu
                workoutPosts={this.state.postsInSideMenu}
                toggle={this.state.toggle}
              />
              <div className="col s11">
                <h1 className="hidden">
                  Fitness Blog Za Žene - Personalni Trener Jelena Stevanović
                </h1>
                <div className="row center-align">
                  {map(orderedPost, post => (
                    <BlogPostCard post={post} key={post.key} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="component blog">
          <div className="row">
            <div className="col s1">
              <button
                className="btn waves-effect waves-light"
                onClick={() => {
                  this.toggleMenus('workoutPosts');
                }}
              >
                Vežbanje
              </button>
              <button
                className="btn waves-effect waves-light"
                onClick={() => {
                  this.toggleMenus('healthPosts');
                }}
              >
                Zdravlje
              </button>
              <button
                className="btn waves-effect waves-light"
                onClick={() => {
                  this.toggleMenus('foodPosts');
                }}
              >
                Hrana
              </button>
            </div>
            <SideMenu
              workoutPosts={this.state.postsInSideMenu}
              toggle={this.state.toggle}
            />
            <div className="col s11">
              <h1 className="hidden">
                Fitness Blog Za Žene - Personalni Trener Jelena Stevanović
              </h1>
              <div className="row center-align">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
