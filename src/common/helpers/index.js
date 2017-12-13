import tags from '../mocks/tags';

export const extractTagsByUserName = (name) => {
    return tags.filter(({userName}) => {
          return userName === name
    }).map(({tags}) => {
        return tags;
    })
}


/* NOTE: usage - const { tag } = getHighestRatingTagName([tag:"a", rating:10]); */
export const getHighestRatingTagName = (tags) => {
  return tags.reduce((acc, tag) => {

    if(Object.keys(acc) === 0) {
      return tag;
    }

    if(tag.rating > acc.rating) {
      return tag;
    }

  }, {});
}
