
import _ from 'lodash';
import tree from '../state/StateTree';
export default function transformChat(chat, position) {
  return {
    _id: chat.id,
    text: chat.log,
    createdAt: chat.created_at,
    user: {
      _id: _.get(chat, 'user.id', 'id'),
      name: _.get(chat, 'user.first_name', 'user'),
      avatar: _.get(chat, 'user.facebook_user_id') ? `https://graph.facebook.com/${_.get(chat, 'user.facebook_user_id')}/picture?width=200&height=200` : 'https://facebook.github.io/react/img/logo_og.png',
    }
  }
}