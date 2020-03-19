import React from 'react';

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo1_a})`, backgroundSize:'718px', backgroundRepeat:'no-repeat', height:'441px', width:'49.9%', border: '.5px solid #454545', backgroundPosition:'0px 0.25px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo2_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.95%', border: '1px solid #454545', backgroundPosition:'0.25px 0px', backgroundColor:'#454545', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo4_b})`, backgroundSize:'358px', backgroundRepeat:'no-repeat', height:'219px', width:'24.8%', border: '1px solid #454545', backgroundColor:'#454545', float:'left'}}>
          <input class="photoGalButton" type="button" value="Share" style={{backgroundImage:'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/share_icon.png)', backgroundRepeat:'no-repeat', backgroundSize:'26px', backgroundPosition:'10px 5px', height:'36px', width:'96px', border:'none', borderRadius:'4px', margin:'22.5px 0 0 130px'}}></input>
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