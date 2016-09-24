import tree from '../state/StateTree';
import * as api from '../api/teachAClassApi';
const teachAClassFlow = tree.select(['teachAClassFlow']);
const newCard = tree.select(['newPaymentMethod', 'card']);
const paymentMethodForm = tree.select(['newPaymentMethod']);


export async function addSkillCategory(value) {
  teachAClassFlow.set('category', value);
}

export async function addSKill(value) {
  teachAClassFlow.set('skill', value);
}

export async function resetTeachAClassFlow() {
  teachAClassFlow.set({});
}

export async function registerResourceAndService() {
  try {
    await api.registerResourceAndService();
    resetTeachAClassFlow();
  } catch(err) {
    teachAClassFlow.set('error', err);
  }
}

function formatResource(data) {
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

function formatService(data) {
  var service = {
    description: data.description,
    name: data.name,
    image: data.image,
    capacity: data.capacity,
    duration: data.duration,
    price: data.price,
    skill: data.skill
  }
  return service;
}


