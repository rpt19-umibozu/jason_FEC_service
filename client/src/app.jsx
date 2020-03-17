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
      carousel: Carousel
    }

  }

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
        <this.state.photoGallery/>
        <this.state.carousel/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));