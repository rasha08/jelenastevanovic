import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Jelena Stevanovic - Novi Sad',
      description: 'Personalni treninzi za zene u Novom Sadu, lako do savrsene figure, programi za osobe sa povredama ledja i lumbalnog dela kicme, mrsavljenje, zatezanje i pravljenje plana ishrane za brze rezultate',
      image: 'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg',
      author: 'https://www.facebook.com/jelenastevanovic.rs',
      url: 'http://jelenastevanovic.rs',
      selectedElements: []
    };
  }

  componentDidMount() {
    let keyWords = `${this.state.title} ${this.state.description}`
      .toLowerCase()
      .replace(/-/g, '')
      .replace(/\"/g, '')
      .replace(/\:\)/g, '')
      .replace(/\./g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s+/g, ',')
      .replace(/\,,/, ',');

    this.setSeoTags(
      this.state.title,
      this.state.description,
      keyWords,
      this.state.url,
      this.state.image
    );

    window.prerenderReady = true;
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
              "@type": "LocalBusiness",
              "url": "${url}",
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
              "description": "${description}",
              "name": "${title}",
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
              "image": "${image}",
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
    return (
      <div>
        <Header />
        <div className="col s12 landing component">
          <div className="col offset-s1 s10">
            <h3>diplomirani fitness trener</h3>
            <h2>Jelena Stevanović</h2>
            <p>
              Personalni treninzi, pravljenje programa, funkcionalna dijagnostika, korekcija ishrane, grupni treninzi, joga za trudnice...
            </p>
            <Link
              to="/fitnes-blog-i-saveti-za-zene"
              className="waves-effect waves-light btn-large"
            >
              Blog
            </Link>
            <Link
              to="/fitnes-kuvar-i-zdrava-hrana"
              className="waves-effect waves-light btn-large"
            >
              Moj Kuvar
            </Link>

          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
