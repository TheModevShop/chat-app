
import _ from 'lodash';
import tree from '../state/StateTree';
export default function transformChat(chat, position) {
  return {
      text: chat.log,
      name: _.get(chat, 'user.name.first', chat.user),
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
      uniqueId:  Math.round(Math.random() * 10000),
      _id: chat._id
  }
}