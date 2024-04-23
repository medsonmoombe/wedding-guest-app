import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


export const imagesAtom = atom({
  key: 'imagesAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const displayImagesAtom = atom({
  key: 'displayImagesAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
