
import _ from 'lodash';
export default function transformChat(chat, position) {
  console.log(chat)
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