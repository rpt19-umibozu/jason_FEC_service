import React from 'react';
import $ from 'jquery';

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);

    this.heartPhotos = ['https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart.png', 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart_true.png'];

    this.handleSaved = (e) => {
      e.preventDefault();
      console.log('button', e.target);
      if (!this.state.heart) {
        this.setState({
          heart: !this.state.heart,
          heartPhoto: this.heartPhotos[1],
          saveButtonValue: 'Saved',
          saveButtonMargin: '23px 0 0 18.7px',
          saveButtonWidth: '100px',
          saveButtonHeight: '38px',
          heartSize: '22.5px',
          heartPosition: '11.5px 6px',
          shareButtonMargin: '23px 0 0 121px',
          saveButtonMargin: '22.5px 0 0 18.5px',
        });
      } else {
        this.setState({
          heart: !this.state.heart,
          heartPhoto: this.heartPhotos[0],
          saveButtonValue: 'Save',
          saveButtonMargin: '23px 0 0 18.7px',
          saveButtonWidth: '90px',
          saveButtonHeight: '36px',
          heartSize: '24px',
          heartPosition: '8px 4.8px',
          shareButtonMargin: '23px 0 0 130px',
        });
      }
    }

    this.state = {
      heart: false,
      heartPhoto: this.heartPhotos[0],
      saveButtonValue: 'Save',
      saveButtonMargin: '23px 0 0 18.7px',
      saveButtonWidth: '90px',
      saveButtonHeight: '36px',
      heartSize: '24px',
      heartPosition: '10px 6px',
      shareButtonMargin: '23px 0 0 130px'
    }
  }

  handleShare(e) {
    e.preventDefault();
    alert('Listing Shared!');
  }

  render() {
    return (
      <div>
        <div id="photo1" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo1_a})`, backgroundSize:'718px', backgroundRepeat:'no-repeat', height:'441px', width:'49.9%', border: '.5px solid #454545', backgroundPosition:'0px 0.25px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div id="photo2" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo2_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.95%', border: '1px solid #454545', backgroundPosition:'0.25px 0px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div id="photo4" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <input className="photoGalButton" type="button" value="Share" onClick={this.handleShare} style={{backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:`${this.state.shareButtonMargin}`, float:'left'}}></input>
          <input className="photoGalButton" id="Save" type="button" value={`${this.state.saveButtonValue}`} onClick={this.handleSaved} style={{backgroundImage:`url(${this.state.heartPhoto})`, backgroundRepeat:'no-repeat', backgroundSize:`${this.state.heartSize}`, backgroundPosition:`${this.state.heartPosition}`, height:`${this.state.saveButtonHeight}`, width:`${this.state.saveButtonWidth}`, border:'none', borderRadius:'4px', margin:`${this.state.saveButtonMargin}`}}></input>
        </div>
        <div id="photo3" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo3_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.95%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div id="photo5" onClick={this.props.handlePhotoClick} style={{backgroundImage:`url(${this.props.state.currentListing.photo5_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'220px', width:'24.85%', border: '.5px solid #454545', backgroundPosition:'0.25px 0px', backgroundColor:'#454545', float:'left'}}>
          <input className="photoGalButton" id="viewPhotos" type="button" value="View Photos" onClick={this.props.handleViewPhotos} style={{height:'36px', width:'113px', border:'none', borderRadius:'4px', margin:'161px 0 0 222px'}}></input>
        </div>
      </div>
    )
  }
}

export default PhotoGallery;