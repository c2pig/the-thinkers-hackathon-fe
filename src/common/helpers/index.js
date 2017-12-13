import tags from '../mocks/tags';

export const extractTagsByUserName = (name) => {
    return tags.filter(({userName}) => {
          return userName === name
    }).map(({tags}) => {
        return tags;
    })
}
