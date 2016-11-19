import tree from '../state/StateTree';
import * as api from '../api/teachAClassApi';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';

const teachAClassFlow = tree.select(['teachAClassFlow']);
const newCard = tree.select(['newPaymentMethod', 'card']);
const paymentMethodForm = tree.select(['newPaymentMethod']);

teachAClassFlow.on('update', async (e) => {
  const eventData = e.data;
  const data = _.get(eventData, 'currentData');
  AsyncStorage.setItem('teachAClassFlow', JSON.stringify(data));
});

export async function getCurrentAddServiceProgress() {
  let value = await AsyncStorage.getItem('teachAClassFlow');
  try {
    value = JSON.parse(value);
    teachAClassFlow.set(value);
  } catch(e) {};
}

export async function setImage(image) {
  teachAClassFlow.set('image', image);
}

export async function addSkillCategory(value) {
  teachAClassFlow.set('category', value);
}

export async function setServiceLocation(location) {
  teachAClassFlow.set('location', location);
}

export async function addSKill(value) {
  teachAClassFlow.set('skill', value);
}

export async function addServiceBasicData(data) {
  teachAClassFlow.set('serviceBasicData', data);
}



export async function setEquipmentRequired(value) {
  // true false value if equipment is needed
  teachAClassFlow.set('equipmentRequired', value);
}

export async function addEquipmentNeededForService(value, provided) {
  const equipment = _.cloneDeep(teachAClassFlow.get('equipment')) || [];
  equipment.unshift({
    "item": value,
    "provided": provided
  })

  teachAClassFlow.set('equipment', equipment);
}


export async function addSkillLevel(level, value) {
  const skillLevel = _.cloneDeep(teachAClassFlow.get('skillLevel')) || {};
  skillLevel[level] = value;
  teachAClassFlow.set('skillLevel', skillLevel);
}



export async function resetTeachAClassFlow() {
  teachAClassFlow.set({});
}

export async function registerResourceAndService() {
  try {
    const service = formatService();
    const resource = formatResource();
    await api.registerResourceAndService(service, resource);
    resetTeachAClassFlow();
    return true;
  } catch(err) {
    teachAClassFlow.set('error', err);
    return false;
  }
}

function formatResource() {
  // const data = newResource.get();
  var data = { // TODO
    name: 'test-'+Date.now()
  }

  var resource = {
    name: data.name,
    description: data.description,
    long: data.long,
    lat: data.lat,
    street: data.street,
    city: data.city,
    state: data.state,
    zipcode: data.zipcode,
    phone: data.phone,
    email: data.email,
    website: data.website
  }
  return resource;
}

function formatService() {
  const data = teachAClassFlow.get();
  var service = {
    description: _.get(data, 'serviceBasicData.description.value', ''),
    name:  _.get(data, 'serviceBasicData.title.value', ''),
    capacity: _.get(data, 'serviceBasicData.capacity.value'),
    duration: _.get(data, 'serviceBasicData.duration.value', 60),
    price: _.get(data, 'serviceBasicData.price.value', 0) * 100,
    skill_level: _.get(data, 'skillLevel'),
    skill: _.get(data, 'skill.id'),
    long: data.long || -97.7582270, // TODO
    lat: data.lat || 30.2915410, // TODO
    equipment: data.equipment || [],
    image: data.image
  }
  return service;
}


