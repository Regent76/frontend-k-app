import React, { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fakeAuthProvider } from '../services/auth';

const MainMenu: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      label: 'About us',
      key: ''
    },
    {
      label: 'Sign in',
      key: 'login',
      disabled: fakeAuthProvider.isAuthenticated
    },
    {
      label: 'Profile',
      key: 'profile',
      disabled: !fakeAuthProvider.isAuthenticated
    },
    {
      label: 'Sign out',
      key: 'sign-out',
      disabled: !fakeAuthProvider.isAuthenticated
    }
  ];

  const [current, setCurrent] = useState('menu');
  let navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'sign-out') {
      fakeAuthProvider.signout(() => navigate('/'));
      return;
    }

    navigate(e.key);
  };

  return <Menu className="MainMenu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default MainMenu;
