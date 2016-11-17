import tree from '../state/StateTree';
import _ from 'lodash';
const modal = tree.select(['modal']);
const lightBox = tree.select(['lightBox']);

export function openModal(modalData) {
  modal.set(modalData);
}

export function closeModal() {
  modal.set({});
}

export function openLightBox(lightBoxData) {
  lightBox.set(lightBoxData);
}

export function closeLightBox() {
  lightBox.set({});
}