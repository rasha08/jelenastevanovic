import React, { Component } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';

const SingleImage = props => {
  const { image, toggleImage } = props;
  return (
    <div className="img-container col l3 m6 s12">
      <img
        src={image}
        alt="licni trener"
        className="responsive-img thumb-img"
      />
      <div className="image-wrapper center-align">
        <p className="flow-text col s12">dipl. fitness trener</p>
        <h4 className="col s12">Jelena Stevanović</h4>
        {window.innerWidth > 720
          ? <a
              href="#open_image"
              className="btn-floating btn-large waves-effect waves-light"
              role="button"
              onClick={() => {
                if (window.innerWidth > 720) {
                  toggleImage(image);
                }
              }}
            >
              <i className="material-icons">open_in_new</i>
            </a>
          : <div />}
      </div>
    </div>
  );
};
const OpenImageModal = props => {
  const { image, show, closeImage } = props;
  let openImageModal;
  if (show) {
    openImageModal = (
      <div className={show}>
        <div className="container image-modal">
          <button
            className="btn-floating btn-large waves-effect waves-light close"
            onClick={closeImage}
          >
            <i className="material-icons">close</i>
          </button>
          <img
            src={image}
            alt="personalni trener"
            className="responsive-img center-align"
          />

        </div>
      </div>
    );
    return openImageModal;
  }
  openImageModal = (
    <div className={show}>
      <div className="container image-modal" id="open_image">
        <button
          className="btn-floating btn-large waves-effect waves-light close"
          onClick={closeImage}
        >
          <i className="material-icons">close</i>
        </button>
        <img
          src={image}
          alt="personalni trener"
          className="responsive-img center-align"
        />

      </div>
    </div>
  );
  return openImageModal;
};
class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      images: [
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981366/DSC_0051-min_yxbkrp.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981515/DSC_0111-min_iyebey.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981632/DSC_0148-min_miaon5.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981741/DSC_0157-min_vhftn3.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981856/DSC_0187-min_yyjxbl.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981960/DSC_0226a-min_y0erjq.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982072/DSC_0254-min_afoms0.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982175/12809559_445050005703516_8476667965764072254_n_ttiq9w.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982228/10422148_445050009036849_2574643638262623362_n_gzfzio.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982284/12795492_445050035703513_4508566350799193176_n_xhvzz7.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982326/12800205_445050059036844_5734113033230004046_n_1_hakjbz.jpg',
        'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498982349/12799263_445050095703507_3258923399304042572_n_sxq2ia.jpg'
      ],
      openImage: 'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1498981366/DSC_0051-min_yxbkrp.jpg',
      ready: '',
      title: 'Jelena Stevanovic, Galerija Slika - Novi Sad',
      description: 'Individualni treninzi omogućavaju osobi da napreduje i razvija se u skladu sa svojim zeljama i potrebama na dosta brzi i pravilniji način.',
      image: 'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg',
      author: 'https://www.facebook.com/jelenastevanovic.rs',
      url: 'http://jelenastevanovic.rs/galerija',
      selectedElements: []
    };
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ready: 'ready'
      });
    }, 100);

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

  openImage(image) {
    this.setState({
      openImage: image,
      show: true
    });
  }
  closeImage() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div className={this.state.ready}>
        <Header />
        <div className="component gallery">
          <div
            className="gallery-body"
            onClick={() => {
              if (this.state.show) {
                this.closeImage();
              } else {
                return;
              }
            }}
          >
            <div className="row">
              {this.state.images.map(image => (
                <SingleImage
                  image={image}
                  key={image}
                  toggleImage={this.openImage}
                />
              ))}
            </div>
            <OpenImageModal
              image={this.state.openImage}
              show={this.state.show}
              closeImage={this.closeImage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;

SingleImage.propTypes = {
  image: PropTypes.string.isRequired,
  toggleImage: PropTypes.func.isRequired
};
OpenImageModal.propTypes = {
  image: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  closeImage: PropTypes.func.isRequired
};
