import React, { Component } from 'react';
import Header from './Header';

class Services extends Component {
  constructor() {
    super();
    this.state = {
      show: '',
      title: 'Jelena Stevanovic, Individualni Treninzi - Novi Sad',
      description: 'Kako je svaka osoba individua za sebe, moramo razlikovati osobe kojima je potrebna dodatna motivacija i konstantna podrška u vezbanju.',
      image: 'http://res.cloudinary.com/dgq2ohvtq/image/upload/v1474474686/2-min_bsksuq.jpg',
      author: 'https://www.facebook.com/jelenastevanovic.rs',
      url: 'http://jelenastevanovic.rs/personalni-treninzi-za-zene',
      selectedElements: []
    };
  }
  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          show: 'show'
        }),
      100
    );
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
          "url": "http://jelenastevanovic.rs/${url}",
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

    /* ############ START OF FACEBOOK CARD ################# */
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
    /* ############ END OF FACEBOOK CARD ################# */

    this.setMetaTag('name', 'robots', 'index, follow');
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
      <div className={this.state.show}>
        <Header />
        <div className="col m12 l12 s12 services component">
          <div className="service-one">
            <div className="col m12 l12 s12 personal z-depth-5 row center-align">
              <h2>Personalni treninzi</h2>
              <div className="col l6 m6 s12">
                <h3>Individualni treninzi</h3>
                <p className="flow-text">
                  Kako je svaka osoba individua za sebe, moramo razlikovati osobe kojima je potrebna dodatna motivacija i konstantna podrška u vezbanju. Individualni treninzi omogućavaju osobi da napreduje i razvija se u skladu sa svojim zeljama i potrebama na dosta brzi i pravilniji način.
                </p>
              </div>
              <div className="col l6 m6 s12">
                <h4>
                  Termin održavanja treninga je u skladu sa slobodnim vremenom klijenta.
                </h4>
                <h5>A moje radno vreme je:</h5>
                <ul>
                  <li className="flow-text">
                    PONEDELJAK - SUBOTA : 08:00 - 22:00
                  </li>
                  <li className="flow-text">NEDELJA : 16:00 - 22:00</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container center-align">
            <h3>Prijavite se za vesti sa mog sajta...</h3>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s8">
                    <input id="email" type="email" className="validate" />
                    <label
                      htmlFor="email"
                      data-error="wrong"
                      data-success="right"
                    >
                      Email
                    </label>
                  </div>
                  <div className="input-field col s4">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Prijavi Me
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="service-two">
            <div className="col m12 l12 s12 personal z-depth-5 row center-align">
              <h2>Grupni Treninzi</h2>
              <div className="col l6 m6 s12">
                <h3>Body forming</h3>
                <p className="flow-text">
                  Raznolikost treninga, sjajna atmosvera, rad i trud svakog u grupi, utiče na to da se svako više trudi kako bi odrzo korak, a smim tim i postigao što bolje rezultate.
                </p>
              </div>
              <div className="col l6 m6 s12">
                <h3>Power balance</h3>
                <p className="flow-text">
                  Svima je ponekad potrebno da se isključimo od svih problema i brzog načina života. Koncentracija koja je neophodna za pravilno disanje i izvošenje vezbi vas mora naterati da bar na sat vremena zaboravite na sve izuzev na vas same.
                </p>
              </div>
            </div>
          </div>
          <div className="container center-align">
            <h3>Prijavite Se Za Trenige Već Danas</h3>
            <div className="row">
              <div className="col l7 m12 s12 left-align">
                <ul>
                  <li className="flow-text">
                    {' '}
                    <i className="material-icons left">done</i>
                    {' '}
                    Potpuno besplatna funkcionalna dijagnostika
                  </li>
                  <li className="flow-text">
                    {' '}
                    <i className="material-icons left">done</i>
                    {' '}
                    15% popusta na prvi mesec treniranja
                  </li>
                  <li className="flow-text">
                    {' '}
                    <i className="material-icons left">done</i>
                    {' '}
                    Potpuno besplatna korekcija ishrane.
                  </li>
                  <li className="flow-text">
                    {' '}
                    <i className="material-icons left">done</i>
                    {' '}
                    Besplatni saveti 24/7
                  </li>
                </ul>
              </div>
              <form
                className="col l5 m12 s12"
                method="POST"
                action="mail_handler.php"
              >

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="first_name"
                      type="text"
                      className="validate"
                      name="first_name"
                    />
                    <label
                      htmlFor="first_name"
                      data-error="wrong"
                      data-success="right"
                    >
                      Vaše Ime
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input id="email" type="email" className="validate" />
                    <label
                      htmlFor="email"
                      data-error="wrong"
                      data-success="right"
                    >
                      Vaša Email Adresa
                    </label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="phone"
                      type="text"
                      className="validate"
                      name="fb"
                    />
                    <label
                      htmlFor="phone"
                      data-error="wrong"
                      data-success="right"
                    >
                      Vaš Broj Telefona
                    </label>
                  </div>
                  <input type="hidden" name="application" value="true" />
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Prijavi Me
                    <i className="material-icons right">done_all</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="service-three">
            <div className="col m12 l12 s12 personal z-depth-5 row center-align">
              <h2>Treninzi za trudnice</h2>
              <div className="col l6 m6 s12">
                <p className="flow-text">
                  Istovremenim jačanjem i istezanjem mišića, dajemo mogućnost da i vi i beba napredujete na što zdraviji način. Potrebno je pripremiti svoje telo i olakšati mu sve ono što ga tokom trudnoće čeka.
                  {' '}
                </p>
              </div>
              <div className="col l6 m6 s12">
                <p className="flow-text">
                  Uz opuštajuću muziku, dobro raspoloženje i ritmične pokrete sebi i svojoj bebi omogućavamo da svaki novi dan pun novina podnesemo što lakše.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Services;
