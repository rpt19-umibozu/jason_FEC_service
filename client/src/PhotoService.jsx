import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './components/NavBar.jsx';
import PhotoGallery from './components/PhotoGallery.jsx';
import Carousel from './components/Carousel.jsx';
import HardcodePhotos from './components/HardcodePhotos.jsx';
import listingNames from './listingNames';
import '../../public/style.css';

class PhotoService extends React.Component {
  constructor() {
    super()
    this.state = {
      navBar: NavBar,
      photoGallery: PhotoGallery,
      carousel: null,
      currentListing: [],
      is_Favorite: false,
      currentPhotoUrl: null,
      s3PhotoBucketNumber: null,
      currentPhotoIndexInListing: 1,
      numOfCurrentListingPhotos: 30,
      currentPhotoCaption: 'Super Cool Listing!',
      nextPrevImages: [],
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    }
  };

  handleViewPhotos (e) {
    e.preventDefault;
    this.setState({
      carousel: Carousel,
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    });
  };

  dupGetNumOfListingPhotos(listing) {
    let dupPhotosArray = Object.keys(listing).slice(4, -3);
    let dupListingSmallUrls = [];
    let count = 0;
    for (let key of dupPhotosArray) {
      if (listing[key]) {
        if (key.split('').slice(-1) == 'b') {
          dupListingSmallUrls.push(listing[key])
        }
        count++
      }
    }
    return Math.ceil(count / 3);
  };

  componentDidMount() {
    let url = window.location.href;
    let id = url.split('/').pop();
    if (isNaN(Number(id))) {
      if (listingNames.indexOf(id) === -1) {
        id = listingNames[1];
      }
    } else {
      if (id < 10001 || id > 10100) {
        id = 10001;
      }
    }
    let data = {listingId: id};
      $.ajax({
        method: 'GET',
        url: 'http://localhost:3002/listing-info',
        data,
        dataType: 'text',
        success: (result) => {
          result = JSON.parse(result);
          let numOfPhotos = this.dupGetNumOfListingPhotos(result[0]);
          this.setState(() => ({
            currentListing: result[0],
            currentPhotoUrl: result[0].photo1_a,
            nextPrevImages: [result[0].photo1_b, result[0].photo2_b, result[0].photo3_b, result[0].photo4_b],
            numOfCurrentListingPhotos: numOfPhotos,
            currentPhotoCaption: result[0].photo1_caption
          }));
        },
        error: (err) => {
          console.log('error', err);
        }
      });
  };

  handleNextPrevClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    let id = Number(e.target.id);
    let $rightButton = $('#carouselRightButton')[0];
    let $leftButton = $('#carouselLeftButton')[0];
    console.log('here', photoNumber, id, max);
    if (photoNumber === 1) {
      if (id === 1) {
        $rightButton.click();
      } else if (id === 2) {
        $rightButton.click();
        $rightButton.click();
      } else {
        if (id !== 0) {
          $rightButton.click();
          $rightButton.click();
          $rightButton.click();
        }
      }
    } else if (photoNumber === max) {
      if (id === 2) {
        $leftButton.click();
      } else if (id === 1) {
        console.log('1');
        $leftButton.click();
        $leftButton.click();
      } else {
        if (id !== 3) {
          $leftButton.click();
          $leftButton.click();
          $leftButton.click();
        }
      }
    } else {
      let current = this.state.nextPrevOpacities.indexOf('100%');
      if (current > id) {
        if (current - id === 2) {
          $leftButton.click();
          $leftButton.click();
        } else if (current - id === 1) {
          $leftButton.click();
        }
      } else {
        if (id - current === 1) {
          $rightButton.click();
        } else if (id - current === 2) {
          $rightButton.click();
          $rightButton.click();
        }
      }
    }
  };

  handleSearchBar (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  handleExit(e) {
    e.preventDefault();
    this.setState({
      carousel: null,
      photoGallery: PhotoGallery,
      currentPhotoUrl: this.state.currentListing.photo1_a,
      currentPhotoCaption: this.state.currentListing.photo1_caption,
      currentPhotoIndexInListing: 1,
      nextPrevImages: [this.state.currentListing.photo1_b, this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b]
    });
  };

  handleLeftClick(e) {
    e.preventDefault();
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    if (photoNumber !== 1) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber - 1}_a`],
        currentPhotoIndexInListing: --this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`]
      });
    }
    if (photoNumber === max) {
      this.setState({
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      });
    } else if (photoNumber < max && photoNumber - 3 >= 1) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber - 3}_b`], this.state.currentListing[`photo${photoNumber - 2}_b`], this.state.currentListing[`photo${photoNumber - 1}_b`], this.state.currentListing[`photo${photoNumber}_b`]],
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%']
      });
    } else {
      this.setState((prevState) => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') - 1 || (prevState.nextPrevBorders.indexOf('2px solid #404040') === 0 && i === 0)) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') - 1 || (prevState.nextPrevOpacities.indexOf('100%') === 0 && i === 0)) {
              return '100%';
            } else {
              return x;
            }
          })
        }
      });
    }
  };

  handleRightClick(e) {
    let photoNumber = this.state.currentPhotoIndexInListing;
    let max = this.state.numOfCurrentListingPhotos;
    if (photoNumber !== max) {
      this.setState({
        currentPhotoUrl: this.state.currentListing[`photo${photoNumber + 1}_a`],
        currentPhotoIndexInListing: ++this.state.currentPhotoIndexInListing,
        currentPhotoCaption: this.state.currentListing[`photo${this.state.currentPhotoIndexInListing}_caption`],
      })
    }
    if (photoNumber > 1 && photoNumber + 3 <= max) {
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${photoNumber}_b`], this.state.currentListing[`photo${photoNumber + 1}_b`], this.state.currentListing[`photo${photoNumber + 2}_b`], this.state.currentListing[`photo${photoNumber + 3}_b`]],
        nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
        nextPrevOpacities: ['70%', '100%', '70%', '70%']
      })
    } else {
      this.setState((prevState) => {
        return {
          nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
            if (i === prevState.nextPrevBorders.indexOf('2px solid #404040') + 1 || (prevState.nextPrevBorders.indexOf('2px solid #404040') === 3 && i === 3)) {
              return '2px solid #404040';
            } else {
              return x;
            }
          }),
          nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
            if (i === prevState.nextPrevOpacities.indexOf('100%') + 1 || (prevState.nextPrevOpacities.indexOf('100%') === 3 && i === 3)) {
              return '100%';
            } else {
              return x;
            }
          })
        }
      })
    }
  };

  handlePhotoClick(e) {
    e.preventDefault();
    let url = e.target.src;
    let id = Number(e.target.id.split('').pop());
    if (id < 5) {
      this.setState({
        carousel: Carousel,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', 'none'].map((x, i) => {
          if (i === (id - 1)) {
            return '2px solid #404040';
          } else {
            return x;
          }
        }),
        nextPrevOpacities: ['70%', '70%', '70%', '70%'].map((x, i) => {
          if (i === (id - 1)) {
            return '100%';
          } else {
            return x;
          }
        })
      });
    } else if (id === 5) {
      this.setState({
        nextPrevImages: [this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b, this.state.currentListing.photo5_b],
        carousel: Carousel,
        currentPhotoUrl: url,
        currentPhotoIndexInListing: id,
        currentPhotoCaption: this.state.currentListing[`photo${id}_caption`],
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%']
      });
    }
  };

  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar handleSearchBar={this.handleSearchBar.bind(this)}/>
        <this.state.photoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)} handlePhotoClick={this.handlePhotoClick.bind(this)}/>
        {this.state.carousel ? <this.state.carousel state={this.state} handleExit={this.handleExit.bind(this)} handleNextPrevClick={this.handleNextPrevClick.bind(this)} handleLeftClick={this.handleLeftClick.bind(this)} handleRightClick={this.handleRightClick.bind(this)}/> : ''}
        <HardcodePhotos/>
      </div>
    )
  };
};

ReactDOM.render(<PhotoService/>, document.getElementById('PhotoService'));