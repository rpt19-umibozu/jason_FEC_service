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
      currentPhotoUrl: null,
      s3PhotoBucketNumber: null,
      currentPhotoIndexInListing: 1,
      numOfCurrentListingPhotos: 30,
      currentPhotoCaption: 'Super Cool Listing!',
      nextPrevImages: [],
      nextPrevBorders: ['2px solid black', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    }

    this.handleViewPhotos = (e) => {
      e.preventDefault;
      console.log('clicked');
      console.log('target', e.target);
      console.log('this', this);
        this.setState({
          carousel: Carousel
        });
    }

  }

  dupGetNumOfListingPhotos (listing) {
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
    e.preventDefault;
    let src = e.target.src;
    let srcSplit = src.split('/');
    let file = srcSplit.pop();
    file = file.split('');
    file.splice(-9, 5, 'Large').join('');
    srcSplit.push(file.join(''));
    src = srcSplit.join('/');
    let num = src.split('/').pop();
    num = num.split('').slice(-11, -9).join('');
    let id = e.target.id;
    let photosArray = Object.keys(this.state.currentListing).slice(4, -3);
    let listingSmallUrls = [];
    let getNumOfListingPhotos = () => {
      let count = 0;
      let listing = this.state.currentListing;
      console.log('listing', listing);
      for (let key of photosArray) {
        if (listing[key]) {
          if (key.split('').slice(-1) == 'b') {
            listingSmallUrls.push(listing[key])
          }
          count++
        }
      }
      return count;
    }
    let numOfListingPhotos = Math.ceil(getNumOfListingPhotos() / 3);
    console.log('numOflistingPhotos', numOfListingPhotos);
    console.log('listingSmallUrls', listingSmallUrls);
    let index = listingSmallUrls.indexOf(e.target.src);
    this.setState({
      currentPhotoIndexInListing: index + 1
    });
    let nextPrevIndex = this.state.nextPrevImages.indexOf(e.target.src);
    console.log('nextPrevIndex', nextPrevIndex);
    if (nextPrevIndex > 1 && this.state.nextPrevImages[this.state.nextPrevImages.length - 1] !== listingSmallUrls[listingSmallUrls.length - 1]) {
      this.setState({
        nextPrevImages: this.state.nextPrevImages.map((x, i) => {
          if (i < 3) {
            return this.state.nextPrevImages[i + 1];
          } else {
            if (nextPrevIndex === 2) {
              return listingSmallUrls[index + 2];
            } else {
              return listingSmallUrls[index + 1];
            }
          }
        })
      });
      if (nextPrevIndex === 2) {
        if (index === listingSmallUrls.length - 2) {
          this.setState({
            nextPrevBorders: ['none', 'none', '2px solid black', 'none'],
            nextPrevOpacities: ['70%', '70%', '100%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num
          });
        } else {
          this.setState({
            nextPrevBorders: ['none', '2px solid black', 'none', 'none'],
            nextPrevOpacities: ['70%', '100%', '70%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num
          });
        }
      } else if (nextPrevIndex === 3) {
        if (index === listingSmallUrls.length - 1) {
          this.setState({
            nextPrevBorders: ['none', 'none', 'none', '2px solid black'],
            nextPrevOpacities: ['70%', '70%', '70%', '100%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num
          });
        } else {
          this.setState({
            nextPrevBorders: ['none', 'none', '2px solid black', 'none'],
            nextPrevOpacities: ['70%', '70%', '100%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num
          });
        }
      }
    } else if (nextPrevIndex < 2 && this.state.nextPrevImages[0] !== listingSmallUrls[0]) {
      this.setState({
        nextPrevImages: this.state.nextPrevImages.map((x, i) => {
          if (i > 0) {
            return this.state.nextPrevImages[i - 1];
          } else {
            if (nextPrevIndex === 1) {
              return listingSmallUrls[index - 2];
            }
            return listingSmallUrls[index - 1];
          }
        })
      });
      if (nextPrevIndex === 1) {
        this.setState({
          nextPrevBorders: ['none', 'none', '2px solid black', 'none'],
          nextPrevOpacities: ['70%', '70%', '100%', '70%'],
          currentPhotoUrl: src,
          s3PhotoBucketNumber: num
        });
      } else {
        this.setState({
          nextPrevBorders: ['none', '2px solid black', 'none', 'none'],
          nextPrevOpacities: ['70%', '100%', '70%', '70%'],
          currentPhotoUrl: src,
          s3PhotoBucketNumber: num
        });
      }
    } else if (nextPrevIndex === 0 && this.state.nextPrevImages[0] === listingSmallUrls[0]) {
      this.setState({
        nextPrevBorders: ['2px solid black', 'none', 'none', 'none'],
        nextPrevOpacities: ['100%', '70%', '70%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num
      });
    } else if (nextPrevIndex === 1 && this.state.nextPrevImages[0] === listingSmallUrls[0]) {
      this.setState({
        nextPrevBorders: ['none', '2px solid black', 'none', 'none'],
        nextPrevOpacities: ['70%', '100%', '70%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num
      });
    } else if (nextPrevIndex === 2 && this.state.nextPrevImages[this.state.nextPrevImages.length - 1] === listingSmallUrls[listingSmallUrls.length - 1]) {
      this.setState({
        nextPrevBorders: ['none', 'none', '2px solid black', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num
      });
    } else if (nextPrevIndex === 3 && this.state.nextPrevImages[this.state.nextPrevImages.length - 1] === listingSmallUrls[listingSmallUrls.length - 1]) {
      this.setState({
        nextPrevBorders: ['none', 'none', 'none', '2px solid black'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num
      });
    } else {
      let newBorders = ['none', 'none', 'none', 'none'].map((x, i) => {
        if (i == id - 1) {
          return '2px solid black';
        } else {
          return x;
        }
      });
      let newOpacities = ['70%', '70%', '70%', '70%'].map((x, i) => {
        if (i == id - 1) {
          return '100%';
        } else {
          return x;
        }
      });
      this.setState({
        nextPrevBorders: newBorders,
        nextPrevOpacities: newOpacities,
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num
      });
    }
  };

  handleSearchBar (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('default prevented');
    }
  }

  handleExit(e) {
    e.preventDefault;
    this.setState({
      carousel: Empty
    });
  };

  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar handleSearchBar={this.handleSearchBar.bind(this)}/>
        <this.state.photoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)}/>
        <this.state.carousel state={this.state} handleExit={this.handleExit.bind(this)} handleNextPrevClick={this.handleNextPrevClick.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));