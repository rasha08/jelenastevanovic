import React from 'react';
import Header from './Header';

const Contact = () => (
  <div>
    <Header />
    <div className="col s12 component contact">
      <div className="col offset-s4 s6">
        <form method="POST" action="mail_handler.php">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                className="validate"
                name="first_name"
              />
              <label htmlFor="name" data-error="wrong" data-success="right">
                Vaše Ime
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="last_name"
                type="text"
                className="validate"
                name="last_name"
              />
              <label htmlFor="name" data-error="wrong" data-success="right">
                Vaše Prezime
              </label>
            </div>
            <div className="input-field col s12">
              <input id="name" type="text" className="validate" name="fb" />
              <label htmlFor="name" data-error="wrong" data-success="right">
                Link do Vašeg Facebook profila / Vaš Broj Telefona
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
              />
              <label htmlFor="email" data-error="wrong" data-success="right">
                Vaša Email Adresa
              </label>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  name="message"
                />
                <label htmlFor="textarea1">Mesto za Vašu poruku...</label>
              </div>
            </div>
            <button type="submit" className="btn waves-effect waves-light">
              Pošalji
              <i className="material-icons right">email</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
