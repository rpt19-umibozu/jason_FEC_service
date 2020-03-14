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
  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar/>
        <this.state.photoGallery/>
        <this.state.carousel/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));