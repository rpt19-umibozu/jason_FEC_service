import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './components/NavBar.jsx';
import PhotoGallery from './components/PhotoGallery.jsx';
import Carousel from './components/Carousel.jsx';
import Empty from './components/Empty.jsx';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      navBar: NavBar,
      photoGallery: PhotoGallery,
      carousel: Empty,
      currentListing: [],
      is_Favorite: false
    }

    this.handleViewPhotos = (e) => {
      e.preventDefault;
      console.log('clicked');
      console.log('target', e.target);
      console.log('this', this);
        this.setState({
          photoGallery: Empty,
          carousel: Carousel
        });
    }

  }

  componentDidMount() {
    let url = window.location.href;
    let id = url.split('/').pop();
    let data = {listingId: id};
    console.log(data)
    console.log('id', id);
      $.ajax({
        method: 'GET',
        url: '/listing-info',
        data: data,
        dataType: 'text',
        success: (result) => {
          result = JSON.parse(result);
          console.log('result in client', result);
          this.setState(() => ({currentListing: result[0]}));
        },
        error: (err) => {
          console.log('error', err);
        }
      });
  };

  handleSearchBar (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('default prevented');
    }
  }

  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar handleSearchBar={this.handleSearchBar.bind(this)}/>
        <this.state.photoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)}/>
        <this.state.carousel/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));