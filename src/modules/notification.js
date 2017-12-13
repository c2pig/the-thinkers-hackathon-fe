import { REHYDRATE } from 'redux-persist';
const initialState = {
  queue: []
};

export const QUEUE_NOTIFICATION = 'QUEUE_NOTIFICATION';
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
      queue.push(action.payload.notification);
      return {
        ...state,
        queue: [...queue]
      };
    default:
      return state;
  }
};
