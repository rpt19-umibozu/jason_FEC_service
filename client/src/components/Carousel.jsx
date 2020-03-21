import React from 'react';
import $ from 'jquery';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="carouselContainer">
        <img src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselX.png" alt="carousel exit button" id="carouselExitButton"/>
        <img src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselLeft.png" alt="carousel left button" id="carouselLeftButton"/>
        <img src={`${this.props.state.currentListing.photo1_a}`} alt="currently selected carousel photo" id="currentCarouselPhoto"/>
        {/* <img src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselRight.png" alt="carousel right button" id="carouselRightButton"/> */}
      </div>
    )
  }
}

export default Carousel;