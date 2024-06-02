
export const convert = (item) => {
    return ({
      imdbID: item.id,
      Poster: item.poster,
      Type: item.type,
      Title: item.title,
      Year: item.year
    })
  }
export const serializeData = (apiResponse) => {
    return apiResponse.map(item => ({
        imdbID: item.id,
        Poster: item.poster,
        Type: item.type,
        Title: item.title,
        Year: item.year
    }));
};


export const prepareData = (apiResponse) => {
    return {
        id: apiResponse.imdbID,
        poster: apiResponse.Poster,
        type: apiResponse.Type,
        title: apiResponse.Title,
        year : apiResponse.Year
    };
    
}

