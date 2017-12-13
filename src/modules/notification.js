import { REHYDRATE } from 'redux-persist';
const initialState = {
  queue: []
};

export const QUEUE_NOTIFICATION = 'QUEUE_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';

export const STATUS_UNREAD = 'unread';
export const STATUS_READ = 'read';

export default (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload &&
        action.payload.notification &&
        action.payload.notification.data
          ? Object.keys(action.payload.notification.data)
          : state;
      return rehydratedData;
    case QUEUE_NOTIFICATION:
      let queue = state.queue;
      queue.push({
        ...action.payload.notification,
        id: state.queue.length,
        status: STATUS_UNREAD
      });
      return {
        ...state,
        queue: [...queue]
      };
    case READ_NOTIFICATION:
      let tQueue = state.queue;
      tQueue[action.payload.queueId].status = STATUS_READ;
      return {
        queue: [...tQueue]
      };
    default:
      return state;
  }
};
