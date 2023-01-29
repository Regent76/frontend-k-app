import React, { useEffect, useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { backendMock } from '../services/backend';
import { AuthContext } from '../App';

export const ProfilePageContainer = () => {
  const auth = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    avatarPath: ''
  });
  useEffect(() => {
    if (auth?.user) {
      backendMock.getUserInfo(auth.user.token)
        .then(response => {
          setUserInfo({
            name: response.data.fullname.split(' ').at(0) ?? '',
            avatarPath: 'https://loremflickr.com/300/300/owl'
          })
        })
        .catch(error => {
          alert(error.data.message);
        });
    }
  }, []);

  return <ProfilePage userInfo={userInfo}/>;
}

export default ProfilePageContainer;
