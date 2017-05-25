import React from 'react';
import { Emojione } from 'react-emoji-render';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.message.user_id === this.props.otherUser.id) {
      return (
        <div className="message-item left-message-item"> 
          <div className="message-picture-container">
            <img src={this.props.otherUser.profile_url}/>
          </div>
          <div className="message-body their-message">
            { <Emojione text={this.props.message.body} /> }
          </div> 
        </div>
      );
    } else 
      return (
        <div className="message-item right-message-item">
          <div className="message-body our-message">
            { <Emojione text={this.props.message.body} /> }
          </div> 
        </div>
      );
  }
}

export default MessageItem;
