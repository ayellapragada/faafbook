import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { logout } from '../../actions/session_actions';
import { fetchAllConversations, 
  readConversations } from '../../actions/message_actions';
import FriendRequests from './friend_requests';
import Chat from './chat';
import Unread from './unread.jsx';


class RightNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({requests: false, chat: false});
    this.toggleRequests = this.toggleRequests.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllConversations();
  }


  toggleRequests() {
    this.setState({chat: false});
    const opposite = !this.state.requests; 
    this.setState({requests: opposite });
  }

  toggleChat() {
    this.setState({requests: false});
    const opposite = !this.state.chat; 
    this.setState({chat: opposite });
  }

  handleChat() {
    this.toggleChat();
  }

  handleClickOutside (evt) {
    // Can be used to handle all, messages and notifications later.
    this.setState({requests: false, chat: false});
  }

  render() {
    if (this.props.currentUser){
      return (
        <div className="right-navbar">
          <Link className="navbar-btn profile-link right-navbar-words"
            to={"/profile/" + this.props.currentUser.id}>
            <img src={this.props.currentUser.profile_url}
              className="navbar-profile-photo"/>
            {this.props.currentUser.fname}
          </Link>
          <div className="empty-border-left"></div>
          <Link className="navbar-btn home-link right-navbar-words"
            to={"/"}>
            Home
          </Link>
          <div
            onClick={this.toggleRequests}
            className={`navbar-btn ${this.state.requests ? "active-btn" : ""}`}>
            <i className="fa fa-users" aria-hidden="true"></i>
          </div>
          <div className="friend-requests-dropdown">
            { this.state.requests && <FriendRequests/> }
            { this.state.chat && <Chat toggleChat={this.toggleChat} /> }
          </div>
          <div
            id="chat-dropdown"
            onClick={this.handleChat}
            className={`navbar-btn ${this.state.chat ? "active-btn" : ""}`}>
            <i className="fa fa-comments" aria-hidden="true"></i>
            <div className="relative-unread">
              <Unread />
            </div>
          </div>
          <div
            className="navbar-btn">
            <i className="fa fa-globe" aria-hidden="true"></i>
          </div>
          <div className="empty-border"></div>
          <div className="navbar-btn logout-btn" 
            onClick={() => this.props.logout()
                .then(() => hashHistory.push('/login'))
            }>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  // <div className="navbar-btn help-btn">
  //   <i className="fa fa-question-circle" aria-hidden="true"></i>
  // </div>

}

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()).then(hashHistory.push('/login')),
  readConversations: () => dispatch(readConversations()),
  fetchAllConversations: () => dispatch(fetchAllConversations()),
});


export default connect(
  mapStateToProps, 
  mapDispatchToProps)(onClickOutside(RightNavbar));
