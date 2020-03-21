import React from 'react';
import $ from 'jquery';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPrevBorders: ['none', 'none', 'none', 'none'],
      nextPrevOpacities: ['100%', '70%', '70%', '70%']
    };
  }

  handleExit(e) {
    e.preventDefault;
    console.log('handling exit...')
  }

  handleNextPrevClick(e) {
    e.preventDefault;
    let id = e.target.id;
    let newBorders = ['none', 'none', 'none', 'none'].map((x, i) => {
      if (i == id) {
        return '2px solid black';
      } else {
        return x;
      }
    });
    let newOpacities = ['70%', '70%', '70%', '70%'].map((x, i) => {
      if (i == id) {
        return '100%';
      } else {
        return x;
      }
    });
      this.setState({
        nextPrevBorders: newBorders,
        nextPrevOpacities: newOpacities
      });
  }

  render() {
    return (
      <div id="carouselContainer">
        <img onClick={this.handleExit} src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselX.png" alt="carousel exit button" id="carouselExitButton"/>
        <div style={{float:'left'}}>
        <img src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselLeft.png" alt="carousel left button" id="carouselLeftButton"/>
        <img src={`${this.props.state.currentPhoto}`} alt="currently selected carousel photo" id="currentCarouselPhoto"/>
        <img src="https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/carouselRight.png" alt="carousel right button" id="carouselRightButton"/>
        </div>
        <div id="prevAndNextImagesContainer">
          <img src={this.props.state.nextPrevImages[0]} alt='preview of previous and next images in carousel' className='nextPrevImages' onClick={this.handleNextPrevClick.bind(this)} style={{border:`${this.state.nextPrevBorders[0]}`, opacity:`${this.state.nextPrevOpacities[0]}`}} id="0"/>
          <img src={this.props.state.nextPrevImages[1]} alt='preview of previous and next images in carousel' className='nextPrevImages'onClick={this.handleNextPrevClick.bind(this)} style={{border:`${this.state.nextPrevBorders[1]}`, opacity:`${this.state.nextPrevOpacities[1]}`}} id="1"/>
          <img src={this.props.state.nextPrevImages[2]} alt='preview of previous and next images in carousel' className='nextPrevImages'onClick={this.handleNextPrevClick.bind(this)} style={{border:`${this.state.nextPrevBorders[2]}`, opacity:`${this.state.nextPrevOpacities[2]}`}} id="2"/>
          <img src={this.props.state.nextPrevImages[3]} alt='preview of previous and next images in carousel' className='nextPrevImages'onClick={this.handleNextPrevClick.bind(this)} style={{border:`${this.state.nextPrevBorders[3]}`, opacity:`${this.state.nextPrevOpacities[3]}`}} id="3"/>
        </div>
      </div>
    )
  }
}

export default Carousel;