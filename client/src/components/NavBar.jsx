import React from 'react';

const NavBar = (props) => {
  return (
    <div style={{padding:'10px 0 10px 13px'}}>
      <img src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnblogo.jpg' alt='airbnb logo' style={{width:'40.25px', height:'45px', float:'left'}}/>
      <form style={{paddingLeft:'20px', float:'left'}}>
      <input onKeyPress={props.handleSearchBar} placeholder ='Search' style={{padding:'16px 288px 16px 45px', borderRadius:'4px', border:'1px solid lightgray', backgroundImage: 'url(https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/searchlogo.jpg)', backgroundSize: '28.5px', backgroundPosition:'10px', backgroundRepeat:'no-repeat'}}/>
      </form>
      <div>
        <p style={{padding:'0px 10px 15px 904px', letterSpacing:'0.04em', fontWeight:'500', fontFamily:'arial, sans-serif', fontSize:'14px'}}>Add listing⠀⠀⠀Host⠀⠀⠀Saved⠀⠀⠀ Trips⠀⠀⠀Messages⠀⠀ Help</p>
        <img src='https://fec-photos.s3-us-west-1.amazonaws.com/otherPics/airbnbprofilepic.jpg' alt='airbnb logo' style={{width:'40.25px', height:'45px', float:'right', margin:'-61px 10px 0 0', height:'2.6em'}}/>
      </div>
    </div>
  )
}

export default NavBar;