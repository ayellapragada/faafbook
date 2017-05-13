import { combineReducers } from 'redux';
import {USER_LOGOUT} from '../actions/session_actions';

import SessionReducer from './session_reducer';
import UserReducer from './user_reducer';
import FriendsReducer from './friends_reducer';
import PostsReducer from './posts_reducer';
import SearchReducer from './search_reducer';
import ConversationReducer from './conversation_reducer';
import ChatReducer from './chat_reducer';
import ChatSearchReducer from './chat_search_reducer';


const AppReducer = combineReducers({
  session: SessionReducer,
  user: UserReducer,
  friends: FriendsReducer,
  posts: PostsReducer,
  search: SearchReducer,
  conversations: ConversationReducer,
  chats: ChatReducer,
  chatSearch: ChatSearchReducer,
});

const RootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return AppReducer(state, action);
};

export default RootReducer;
