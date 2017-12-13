import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { ADD_LOOP } from './loopList';
import { getCurrentUser, getUserDetailsWithUsername } from 'store/modules';
import loopsMockData from 'common/mocks/loops';
import { extractTagsByUserName } from 'common/helpers';

let loopsData = loopsMockData;

export const DROP_MESSAGE = 'DROP_MESSAGE';
export const CLOSE_TOPIC = 'CLOSE_TOPIC';
export const DROP_JD_MESSAGE = 'DROP_JD_MESSAGE';
export const DROP_CONTACT_MESSAGE = 'DROP_CONTACT_MESSAGE';
export const STATUS_OPEN = 'open';
export const STATUS_CLOSED = 'closed';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

// Reducer
const data = (state = loopsData, action) => {
  switch (action.type) {
    case REHYDRATE:
      const rehydratedData =
        action.payload && action.payload.loops && action.payload.loops.data
          ? action.payload.loops.data
          : state;
      loopsData = rehydratedData;
      return rehydratedData;

    case ADD_LOOP:
      loopsData = { ...loopsData, [action.data.id]: action.data };
      return loopsData;
    case UPVOTE: {
      let upVoteLoop = state[action.data.id];
      const upVoteRating = action.data.rating;
      const topicAfterUpvote = Object.assign({...upVoteLoop}, { rating: upVoteRating });
      return {
          ...state,
          [action.data.id]: topicAfterUpvote
      }
    }
      
    case DOWNVOTE: {
      let downVoteLoop = state[action.data.id];
      const downVoteRating = action.data.rating;
      const topicAfterDownvote = Object.assign({...downVoteLoop}, { rating: downVoteRating });
      return {
        ...state,
        [action.data.id]: topicAfterDownvote
      }
    }

    case CLOSE_TOPIC: {
      let closedloop = state[action.payload.loopId];
      closedloop.status = STATUS_CLOSED;
      closedloop.closeTopicResponder = action.payload.closeTopicResponder;
  
      return {
        ...state,
        [action.payload.loopId]: { ...closedloop },
      };
    }
      
    case DROP_MESSAGE: {
      let loop = state[action.payload.loopId];
      const comment = {
        postType: 'drop-message',
        date: new Date().toString(),
        rating: 1,
        totalHired: 10,
        headline: 'i am kong',
        phone: '123',
        email: 'kong@gmail.com',
        tags: extractTagsByUserName('Kong'),
        ...action.payload,
      };
      loop.comments.push(comment);

      return {
        ...state,
        [action.payload.loopId]: { ...loop, comments: [...loop.comments] },
      };
    }

    case DROP_JD_MESSAGE: {
      let loop = state[action.payload.loopId];
      const comment = {
        ...action.payload,
      };
      loop.comments.push(comment);

      return {
        ...state,
        [action.payload.loopId]: { ...loop, comments: [...loop.comments] },
      };
    }

    case DROP_CONTACT_MESSAGE: {
      let loop = state[action.payload.loopId];
      const comment = {
        postType: 'contact-me',
        date: new Date().toString(),
        rating: 1,
        totalHired: 10,
        headline: 'i am kong',
        phone: '123',
        email: 'kong@gmail.com',
        tags: extractTagsByUserName('Kong'),
        ...action.payload,
      };
      loop.comments.push(comment);

      return {
        ...state,
        [action.payload.loopId]: { ...loop, comments: [...loop.comments] },
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  data,
});

export const attachJobMessage = (loopId, job) => (dispatch, getState) => {
  const state = getState();
  const username = getCurrentUser(state);
  const commentUserDetails = getUserDetailsWithUsername(state)(username);
  const payload = {
    postType: 'post-jd',
    date: new Date().toString(),
    totalHired: commentUserDetails.peopleHired,
    tags: extractTagsByUserName(username),
    loopId,
    job,
    username: getCurrentUser(state),
  };
  dispatch({
    type: DROP_JD_MESSAGE,
    payload,
  });
};

export const attachContactMessage = (loopId) => (dispatch, getState) => {
  const state = getState();
  const username = getCurrentUser(state);
  const commentUserDetails = getUserDetailsWithUsername(state)(username);
  const payload = {
    contact: {
      company: commentUserDetails.company,
      email: commentUserDetails.email,
      fullname: commentUserDetails.fullname,
      phone: commentUserDetails.phone,
      position: commentUserDetails.position,
    },
    loopId,
    username,
  };
  dispatch({
    type: DROP_CONTACT_MESSAGE,
    payload,
  });
};

export const upVote = ({ id, rating, username }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: UPVOTE,
    data: {
      id,
      rating: rating + 1
    }
  });
};

export const downVote = ({ id, rating, username }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: DOWNVOTE,
    data: {
      id,
      rating: rating - 1
    }
  });
};

// Getter
export const getData = state => state.data;
