import React, { useState } from 'react';
import { InfoPage } from './InfoPage';
import { backendMock } from '../services/backend';

export const InfoPageContainer = () => {
  const [pageContent, setPageContent] = useState('');

  backendMock.getInfo()
    .then(response => {
      setPageContent(response.data.info);
    })
    .catch(error => {
      alert(error?.data?.message);
    });
  return <InfoPage pageContent={pageContent}/>;
}

export default InfoPageContainer;
