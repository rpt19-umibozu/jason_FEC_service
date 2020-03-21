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
      is_Favorite: false,
      currentPhoto: null,
      nextPrevImages: []
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
          this.setState(() => ({
            currentListing: result[0],
            currentPhoto: result[0].photo1_a,
            nextPrevImages: [result[0].photo1_b, result[0].photo2_b, result[0].photo3_b, result[0].photo4_b]
          }));
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
        <this.state.photoGallery state={this.state}/>
        <this.state.carousel state={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));