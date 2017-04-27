import React from 'react';
import ActionBar from './action_bar';
import ProfileNavBar from './profile_nav_bar';
import UpdatePhotos from  '../modals/update_photos';
import { Link } from 'react-router';

const ControlBar = (props) => {
  return (
    <div className="profile-control-bar">
      <div className="profile-cover-photo">
        <Link to={"/profile/"+props.user.id}
          className="profile-cover-header">
          {`${props.user.fname} ${props.user.lname}`}
        </Link>
        <img 
          className="cover-img"
          src={props.user.cover_url}/>
      </div>
      <div className="profile-profile-photo">
        <img 
          className="profile-img"
          src={props.user.profile_url}/>
      </div>
      <div className="profile-header-space"></div>
        <UpdatePhotos />
      <ActionBar user={props.user} />
      <ProfileNavBar user={props.user}/>
    </div>
  );
};


export default ControlBar;
