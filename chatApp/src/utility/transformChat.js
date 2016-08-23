
import _ from 'lodash';
import tree from '../state/StateTree';
export default function transformChat(chat, position) {
  return {
      text: chat.log,
      name: _.get(chat, 'user.first_name', 'user'),
      image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
      position: 'left',
      date: new Date(),
      uniqueId:  Math.round(Math.random() * 10000),
      id: chat.id
  }
}