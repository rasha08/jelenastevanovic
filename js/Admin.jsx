import React, { Component } from 'react';
import FileInput from 'react-file-input';
import { database, storage } from './firebase';
import map from 'lodash/map';
import Header from './Header';

const AdminBlogPost = props => {
  if (props.show === 'blog') {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                type="text"
                className="validate"
                onBlur={event => props.handleTitleChange(event)}
              />
              <label>Naslov Teksta</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                className="materialize-textarea"
                onBlur={event => props.handleDescriptionChange(event)}
              />
              <label>Opis Teksta</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="autocomplete-input"
                    className="autocomplete"
                    onBlur={event => props.handleCategorySelectChange(event)}
                    autoComplete="off"
                  />
                  <label>Kategorija (ukucas prva 2 slova i izaberes)</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                className="materialize-textarea"
                onBlur={event => props.handleBlogTextChange(event)}
              />
              <label>Tekst</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return <div />;
};

const AdminCookPost = props => {
  if (props.show === 'cook') {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                type="text"
                className="validate"
                onBlur={event => props.handleTitleChange(event)}
              />
              <label>Naslov Recepta</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                className="materialize-textarea"
                onBlur={event => props.handleDescriptionChange(event)}
              />
              <label>Opis Recepta</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="autocomplete-input"
                    className="autocomplete"
                    onBlur={event => props.handleCategorySelectChange(event)}
                    autoComplete="off"
                  />
                  <label>Kategorija (ukucas prva 2 slova i izaberes)</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                onBlur={event => props.handleCookPostIngrediantsChange(event)}
              />
              <label>
                Sastojci (sastojci se moraju nabrajati na sledeći način: sastojak - količina,) primer: paradajz - 200g, brasno - 100g
                {' '}
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return <div />;
};

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      show: 'blog',
      blogPostTitle: '',
      blogPostDescription: '',
      blogPostCategory: '',
      blogPostText: '',
      cookPostTitle: '',
      cookPostDescription: '',
      cookPostCategory: '',
      cookPostIngredients: '',
      postImageUrl: ''
    };
    this.blogPostsRef = database.ref('/blogPosts');
    this.cookPostsRef = database.ref('/cookPosts');
    this.storrageRef = storage.ref('/images').child(this.state.show);

    this.handleCategorySelectChange = this.handleCategorySelectChange.bind(
      this
    );
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleBlogTextChange = this.handleBlogTextChange.bind(this);
    this.handleCookPostIngrediantsChange = this.handleCookPostIngrediantsChange.bind(
      this
    );
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }
  componentDidMount() {
    this.initAutocomplete();
  }

  componentDidUpdate() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    if (this.state.show === 'blog') {
      $('input.autocomplete').autocomplete({
        data: {
          vežbanje: null,
          zdravlje: null,
          hrana: null
        },
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
      });
    } else {
      $('input.autocomplete').autocomplete({
        data: {
          doručak: null,
          ručak: null,
          večera: null,
          užina: null,
          dezert: null
        },
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
      });
    }
  }

  toggleForm(formNameString) {
    this.setState({
      show: formNameString
    });
  }

  handleCategorySelectChange(changeEvent) {
    if (this.state.show === 'blog') {
      this.setState({
        blogPostCategory: changeEvent.target.value
      });
    } else {
      this.setState({
        cookPostCategory: changeEvent.target.value
      });
    }
  }

  handleTitleChange(changeEvent) {
    if (this.state.show === 'blog') {
      this.setState({
        blogPostTitle: changeEvent.target.value
      });
    } else {
      this.setState({
        cookPostTitle: changeEvent.target.value
      });
    }
  }

  handleDescriptionChange(changeEvent) {
    if (this.state.show === 'blog') {
      this.setState({
        blogPostDescription: changeEvent.target.value
      });
    } else {
      this.setState({
        cookPostDescription: changeEvent.target.value
      });
    }
  }

  handleBlogTextChange(changeEvent) {
    this.setState({
      blogPostText: changeEvent.target.value
    });
  }

  handleCookPostIngrediantsChange(changeEvent) {
    let ingrediants = changeEvent.target.value.split(',');
    ingrediants = ingrediants.map(ingredient => ingredient.trim());

    this.setState({
      cookPostIngredients: ingrediants
    });
  }

  addToDatabase() {
    let date = new Date().toDateString();

    if (this.state.show === 'blog') {
      this.blogPostsRef.push({
        title: this.state.blogPostTitle,
        description: this.state.blogPostDescription,
        category: this.state.blogPostCategory,
        text: this.state.blogPostText,
        imgUrl: this.state.postImageUrl,
        date: date
      });
    } else {
      this.cookPostsRef.push({
        title: this.state.cookPostTitle,
        description: this.state.cookPostDescription,
        category: this.state.cookPostCategory,
        ingrediants: this.state.cookPostIngredients,
        imgUrl: this.state.postImageUrl,
        date: date
      });
    }
  }

  handleImageUpload(event) {
    const file = event.target.files[0];
    const uploadTask = this.storrageRef
      .child(file.name)
      .put(file, { contentType: file.type });
    uploadTask.then(snapshot => {
      this.setState({
        postImageUrl: snapshot.downloadURL
      });
      this.setState({
        success: true
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="col s12 services component">
          <div className="col offset-s1 s10 admin" />
          <button
            className="btn waves-effect waves-light"
            onClick={() => {
              this.toggleForm('blog');
            }}
          >
            Blog
          </button>
          <button
            className="btn waves-effect waves-light"
            onClick={() => {
              this.toggleForm('cook');
            }}
          >
            Kuvar
          </button>
          {this.state.success
            ? <h1 className="center">Fajl je spreman</h1>
            : <div />}
          <AdminBlogPost
            show={this.state.show}
            handleCategorySelectChange={this.handleCategorySelectChange}
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleBlogTextChange={this.handleBlogTextChange}
          />
          <AdminCookPost
            show={this.state.show}
            handleCategorySelectChange={this.handleCategorySelectChange}
            handleTitleChange={this.handleTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleCookPostIngrediantsChange={
              this.handleCookPostIngrediantsChange
            }
          />
          <div className="btn">
            <FileInput
              placeholder="dodaj sliku"
              accept=".pnf,.gif,.jpg"
              onChange={this.handleImageUpload}
            />
          </div>
          <div className="row">
            <button
              className="btn waves-effect waves-light right"
              onClick={() => {
                this.addToDatabase();
              }}
            >
              Sačuvaj
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
