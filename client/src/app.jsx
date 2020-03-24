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
      nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
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
    e.preventDefault();
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
    let index = listingSmallUrls.indexOf(e.target.src);
    this.setState({
      currentPhotoIndexInListing: index + 1
    });
    let nextPrevIndex = this.state.nextPrevImages.indexOf(e.target.src);
    console.log('nextPrevIndex', nextPrevIndex);
    console.log('index', index);
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
        }),
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
      });
      if (nextPrevIndex === 2) {
        if (index === listingSmallUrls.length - 2) {
          this.setState({
            nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
            nextPrevOpacities: ['70%', '70%', '100%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num,
            currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
          });
        } else {
          this.setState({
            nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
            nextPrevOpacities: ['70%', '100%', '70%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num,
            currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
          });
        }
      } else if (nextPrevIndex === 3) {
        if (index === listingSmallUrls.length - 1) {
          this.setState({
            nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
            nextPrevOpacities: ['70%', '70%', '70%', '100%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num,
            currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
          });
        } else {
          this.setState({
            nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
            nextPrevOpacities: ['70%', '70%', '100%', '70%'],
            currentPhotoUrl: src,
            s3PhotoBucketNumber: num,
            currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
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
          nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
          nextPrevOpacities: ['70%', '70%', '100%', '70%'],
          currentPhotoUrl: src,
          s3PhotoBucketNumber: num,
          currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
        });
      } else {
        this.setState({
          nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
          nextPrevOpacities: ['70%', '100%', '70%', '70%'],
          currentPhotoUrl: src,
          s3PhotoBucketNumber: num,
          currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
        });
      }
    } else if (nextPrevIndex === 0 && this.state.nextPrevImages[0] === listingSmallUrls[0]) {
      this.setState({
        nextPrevBorders: ['2px solid #404040', 'none', 'none', 'none'],
        nextPrevOpacities: ['100%', '70%', '70%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num,
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
      });
    } else if (nextPrevIndex === 1 && this.state.nextPrevImages[0] === listingSmallUrls[0]) {
      this.setState({
        nextPrevBorders: ['none', '2px solid #404040', 'none', 'none'],
        nextPrevOpacities: ['70%', '100%', '70%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num,
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
      });
    } else if (nextPrevIndex === 2 && this.state.nextPrevImages[this.state.nextPrevImages.length - 1] === listingSmallUrls[listingSmallUrls.length - 1]) {
      this.setState({
        nextPrevBorders: ['none', 'none', '2px solid #404040', 'none'],
        nextPrevOpacities: ['70%', '70%', '100%', '70%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num,
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
      });
    } else if (nextPrevIndex === 3 && this.state.nextPrevImages[this.state.nextPrevImages.length - 1] === listingSmallUrls[listingSmallUrls.length - 1]) {
      this.setState({
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%'],
        currentPhotoUrl: src,
        s3PhotoBucketNumber: num,
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
      });
    } else {
      let newBorders = ['none', 'none', 'none', 'none'].map((x, i) => {
        if (i == id - 1) {
          return '2px solid #404040';
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
        s3PhotoBucketNumber: num,
        currentPhotoCaption: this.state.currentListing[`photo${Number(num)}_caption`]
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
    e.preventDefault();
    this.setState({
      carousel: Empty,
      photoGallery: PhotoGallery,
      currentPhotoIndexInListing: 1,
      nextPrevImages: [this.state.currentListing.photo1_b, this.state.currentListing.photo2_b, this.state.currentListing.photo3_b, this.state.currentListing.photo4_b]
    });
  };

  handleLeftClick(e) {
    e.preventDefault();
    let url = this.state.currentPhotoUrl;
    let urlSplit = url.split('/');
    let file = urlSplit.pop();
    file = file.split('');
    file.splice(-9, 5, 'Small').join('');
    urlSplit.push(file.join(''));
    let smallUrl = urlSplit.join('/');
    console.log('smallUrl', smallUrl);
    let nextPrevIndex = this.state.nextPrevImages.indexOf(smallUrl) - 1;
    console.log('nextPrevIndex', nextPrevIndex);
    let $nextPrevPic = $(`#${nextPrevIndex}`)[0];
    console.log('$nextPrevPic', $nextPrevPic);
    if ($nextPrevPic) {
      $nextPrevPic.click();
    }
  }

  handleRightClick(e) {
    e.preventDefault();
    let url = this.state.currentPhotoUrl;
    console.log('url', url);
    let urlSplit = url.split('/');
    let file = urlSplit.pop();
    file = file.split('');
    let num = Number(file[file.length - 11] + file[file.length - 10]);
    console.log('new file', file);
    console.log('new num', num)
    file.splice(-9, 5, 'Small').join('');
    let largeSplit = urlSplit.slice();
    urlSplit.push(file.join(''));
    console.log('file', file)
    file.splice(-5, 1, 'Large').join('');
    largeSplit.push(file.join(''));
    let smallUrl = urlSplit.join('/');
    let largeUrl = largeSplit.join('/');
    console.log('largeUrl', largeUrl);
    console.log('smallUrl', smallUrl);
    let nextPrevIndex = this.state.nextPrevImages.indexOf(smallUrl) + 1;
    console.log('nextPrevIndex', nextPrevIndex);
    let $nextPrevPic = $(`#${nextPrevIndex}`)[0];
    console.log('$nextPrevPic', $nextPrevPic);
    console.log('NUM', num)
    if (num === this.state.numOfCurrentListingPhotos) {
      return;
    }
    if ($nextPrevPic) {
      $nextPrevPic.click();
    } else {
      console.log('new smallUrl', smallUrl);
      console.log('largeUrl', largeUrl);
      if (num < 9) {
        largeUrl = `https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic0${num + 1}Large.jpg`
      } else {
        largeUrl = `https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/mainPic${num + 1}Large.jpg`
      }
      this.setState({
        nextPrevImages: [this.state.currentListing[`photo${num - 2}_b`], this.state.currentListing[`photo${num - 1}_b`], this.state.currentListing[`photo${num}_b`], this.state.currentListing[`photo${num + 1}_b`]],
        currentPhotoUrl: largeUrl,
        currentPhotoIndexInListing: num + 1,
        currentPhotoCaption: this.state.currentListing[`photo${num + 1}_caption`],
        nextPrevBorders: ['none', 'none', 'none', '2px solid #404040'],
        nextPrevOpacities: ['70%', '70%', '70%', '100%']
      });
    }
  }

  handlePhotoClick(e) {
    e.preventDefault();
    let url = e.target.style.backgroundImage.split(`"`)[1];
    console.log('url', url);
    let id = Number(e.target.id.split('').pop());
    console.log('id', id);
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
  }

  render() {
    return (
      <div id="photoGalleryService">
        <this.state.navBar handleSearchBar={this.handleSearchBar.bind(this)}/>
        <this.state.photoGallery state={this.state} handleViewPhotos={this.handleViewPhotos.bind(this)} handlePhotoClick={this.handlePhotoClick.bind(this)}/>
        <this.state.carousel state={this.state} handleExit={this.handleExit.bind(this)} handleNextPrevClick={this.handleNextPrevClick.bind(this)} handleLeftClick={this.handleLeftClick.bind(this)} handleRightClick={this.handleRightClick.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));