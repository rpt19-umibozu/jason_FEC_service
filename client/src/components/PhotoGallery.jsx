import React from 'react';

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);

    this.heartPhotos = ['https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart.png', 'https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/favorite_heart_true.png'];
  }

  handleShare(e) {
    e.preventDefault();
    alert('Listing Shared!');
  }

  handleSaved(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo1_a})`, backgroundSize:'718px', backgroundRepeat:'no-repeat', height:'441px', width:'49.9%', border: '.5px solid #454545', backgroundPosition:'0px 0.25px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo2_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.95%', border: '1px solid #454545', backgroundPosition:'0.25px 0px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <input class="photoGalButton" type="button" value="Share" onClick={this.handleShare} style={{backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:'23px 0 0 130px', float:'left'}}></input>
          <input class="photoGalButton" id="Save" type="button" value="Save" onClick={this.handleSaved} style={{backgroundImage:`url(${this.heartPhotos[0]})`, backgroundRepeat:'no-repeat', backgroundSize:'24px', backgroundPosition:'10.45px 5.5px', height:'36px', width:'90px', border:'none', borderRadius:'4px', margin:'23px 0 0 18.7px'}}></input>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo3_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.95%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo5_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'220px', width:'24.85%', border: '.5px solid #454545', backgroundPosition:'0.25px 0px', backgroundColor:'#454545', float:'left'}}>
        </div>
      </div>
    )
  }
}

export default PhotoGallery;