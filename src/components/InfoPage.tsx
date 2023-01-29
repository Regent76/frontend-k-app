import * as React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  pageContent: string,
}

export class InfoPage extends React.PureComponent<Props> {
  render() {
    const { pageContent } = this.props;

    if (!pageContent.length) {
      return <LoadingOutlined className="info_loadingIndicator"/>;
    }

    return <h1 dangerouslySetInnerHTML={{ __html: pageContent }}/>;
  }
}
