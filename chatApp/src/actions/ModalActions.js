import tree from '../state/StateTree';
import _ from 'lodash';
const modal = tree.select(['modal']);
const lightBox = tree.select(['lightBox']);
const hud = tree.select(['hud']);

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


export function openHud(hudData) {
  hud.set(hudData);
}

export function closeHud() {
  hud.set({});
}