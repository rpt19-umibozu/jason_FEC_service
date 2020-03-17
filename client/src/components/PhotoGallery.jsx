import React from 'react';

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo1_a})`, backgroundSize:'718px', backgroundRepeat:'no-repeat', height:'440px', width:'49.9%', border: '.5px solid #575656', backgroundColor:'#575656', float:'left'}}>
        </div>
        <div style={{backgroundImage:`url(${this.props.state.currentListing.photo2_b})`, backgroundSize:'718px', backgroundRepeat:'no-repeat', height:'239px', width:'25%', border: '1px solid #575656', float:'left'}}>
        </div>
        {/* <img src={this.props.state.currentListing.photo2_b} style={{height:'239px', width:'25%', border: '1px solid #575656', float:'left'}}/> */}
        <img src={this.props.state.currentListing.photo4_b} style={{height:'239px', width:'24%', border: '1px solid #575656'}}/>
        <img src={this.props.state.currentListing.photo3_b} style={{height:'239px', width:'24%', border: '1px solid #575656'}}/>
      </div>
    )
  }
}

export default PhotoGallery;