import { atom } from 'jotai';

/** eyeTracking Mode */
export const eyeTrackingModeAtom = atom<boolean>(false);

/** eyeTracking을 통해 파악된 학습자 집중도 */
export const learningStatusAtom = atom<number>(0);