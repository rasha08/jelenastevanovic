import React, { Component } from 'react';
import Header from './Header';
import map from 'lodash/map';
import { database } from './firebase';
import Loader from './Loader';
import RecipeCard from './RecipeCard';

class Cook extends Component {
  constructor() {
    super();

    this.state = {
      recipes: null,
      ready: '',
      selectedElements: []
    };

    this.recipesRef = database.ref('/cookPosts');
  }
  componentDidMount() {
    this.recipesRef.on('value', snapshot => {
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

      postsArray = postsArray.reverse();

      this.setState({
        recipes: postsArray
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

  setSeoTags() {
    this.setMetaTitleTag(
      'Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic'
    );

    this.setMetaTag(
      'name',
      'description',
      'Najnoviji recepti i saveti kako da budete vitki, imate savrsenu liniju i kako da ishranom dovedete svoje telo do savrsene forme'
    );

    this.setMetaTag(
      'property',
      'og:title',
      'Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic'
    );
    this.setMetaTag('property', 'og:type', 'website');
    this.setMetaTag(
      'property',
      'og:description',
      'Najnoviji recepti i saveti kako da budete vitki, imate savrsenu liniju i kako da ishranom dovedete svoje telo do savrsene forme'
    );
    this.setMetaTag(
      'property',
      'og:site_name',
      'Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic'
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
      'http://jelenastevanovic.rs/fitnes-kuvar-i-zdrava-hrana'
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
      'http://jelenastevanovic.rs/fitnes-kuvar-i-zdrava-hrana'
    );
    this.setMetaTag(
      'name',
      'twitter:title',
      'Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic'
    );
    this.setMetaTag(
      'name',
      'twitter:description',
      'Najnoviji recepti i saveti kako da budete vitki, imate savrsenu liniju i kako da ishranom dovedete svoje telo do savrsene forme'
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
          "url": "'http://jelenastevanovic.rs/fitnes-kuvar-i-zdrava-hrana",
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
          "description": "Najnoviji recepti i saveti kako da budete vitki, imate savrsenu liniju i kako da ishranom dovedete svoje telo do savrsene forme",
          "name": "Fitness Kuvar Za Zene - Personalni Trener Jelena Stevanovic",
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
    if (this.state.recipes) {
      return (
        <div>
          <Header />
          <div className="component cook">
            <div className="row col s12">
              {this.state.recipes.map(recipe => (
                <RecipeCard key={recipe.key} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="component cook">
          <Loader />
        </div>
      </div>
    );
  }
}

export default Cook;
