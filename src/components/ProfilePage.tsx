import { backendMock } from '../services/backend';
import { Button, Modal } from 'antd';
import * as React from 'react';

interface Props {
  userInfo: {
    name: string,
    avatarPath: string
  }
}

interface State {
  open: boolean,
  confirmLoading: boolean,
  stepFetchAuthor: boolean,
  stepFetchQuote: boolean,
  userQuote: {
    quote: string,
  }
}

export class ProfilePage extends React.PureComponent<Props, State> {
  private cancellationToken: boolean;
  // Because here is mock implementation of backend here not used fetch and AbortController for cancellation, but in
  // the real application it's a better way realization cancellation async requests.

  constructor(props: Props) {
    super(props);
    this.cancellationToken = false;
    this.state = {
      open: false,
      confirmLoading: false,
      stepFetchAuthor: false,
      stepFetchQuote: false,
      userQuote: {
        quote: '[here is place for concatenated result from long running call]'
      }
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.cancellationToken = false;
    this.setState({
      open: true,
      confirmLoading: true,
      stepFetchAuthor: false,
      stepFetchQuote: false
    });

    backendMock.getAuthor()
      .then(responseAuthor => {
        if (this.cancellationToken) {
          throw new Error('Cancelled.');
        }
        this.setState({
          stepFetchAuthor: true
        });
        return backendMock.getQuoteByAuthorId(responseAuthor.data.authorId);
      })
      .then(responseQuote => {
        if (this.cancellationToken) {
          throw new Error('Cancelled.');
        }
        this.setState({
          open: false,
          confirmLoading: false,
          stepFetchQuote: true,
          userQuote: {
            quote: responseQuote.data.quote
          }
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  handleCancel() {
    this.setState({
      open: false,
      confirmLoading: false,
      stepFetchAuthor: false,
      stepFetchQuote: false
    });
    this.cancellationToken = true;
  };

  render() {
    const { userInfo } = this.props;
    const { userQuote, confirmLoading, open, stepFetchAuthor, stepFetchQuote } = this.state;

    return <div className="profileContainer">
      <div className="profileContainer_avatar" style={{ backgroundImage: 'url(' + userInfo.avatarPath + ')' }}/>
      <div className="profileContainer_greeting">
        <h1>Welcome, {userInfo.name}!</h1>
        <Button type="primary" onClick={this.showModal}>Update</Button>
      </div>
      <div className="profileContainer_quote">{userQuote.quote}</div>
      <Modal
        title="Requesting the quote"
        open={open}
        confirmLoading={confirmLoading}
        footer={null}
      >
        {
          confirmLoading &&
          <p>Step1: RequestingAuthor.. {stepFetchAuthor ? <span>Completed</span> : ''}</p>
        }
        {
          stepFetchAuthor &&
          <p>Step2: RequestingQuote.. {stepFetchQuote ? <span>Completed</span> : ''}</p>
        }
        <Button key="cancel"
                type="primary"
                onClick={this.handleCancel}
                className="profileContainer_modalCancelButton">Cancel</Button>
      </Modal>
    </div>;
  }
}
