import { MessagePayload } from 'firebase/messaging';
import mitt, { Emitter } from 'mitt';
import { AppEvent } from './constants';
export * from './constants';

type EmitterEvent = {
  [AppEvent.EXPORT_CSV]: MessagePayload;
};

export type CustomEmitter = Emitter<EmitterEvent>;

export const emitter: CustomEmitter = mitt<EmitterEvent>();
