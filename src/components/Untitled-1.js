//  export function getChar(url) {
//    return function getFoo(dispatch) {
//      axios(`https://rickandmortyapi.com/api${url}`).then(({ data }) => {
//        const results = data.results
//        dispatch({ type: ADD_CHARACTERS, list: results })
//      })
//   }
 }

const sendGetRequest = async () => {
    try {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export function getChar(url) {
  return async (dispatch) => {
    try {
        const getList = axios(`https://rickandmortyapi.com/api${url}`).then((data) => data.results)
        console.log(getList)
        const getNames = Promise.all(epiArray.map((epiUrl) => axios(epiUrl))).then((allNamesArr) =>
        allNamesArr.map((epiObj) => epiObj.name)
        console.log(getNames)
      )
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  }
};

export function getChar(url) {
  return async (dispatch) => {
    const charLink = `https://rickandmortyapi.com/api${url}`

    const getList = (chUrl) => axios(chUrl).then((data) => data.results)

    // = [{},{}]

    const getNames = (epiArray) =>
      Promise.all(epiArray.map((epiUrl) => axios(epiUrl))).then((allNamesArr) =>
        allNamesArr.map((epiObj) => epiObj.name)
      )
    // = ['','']

    return getList(charLink).then((listArr) =>
      getNames(listArr.map((it) => it.episode[0]))
        .then((episArr) =>
          listArr.map((it, id) => {
            return { ...it, name: episArr[id] }
          })
        )
        .then((result) => await dispatch({ type: ADD_CHARACTERS, list: result }))
    )
  }
}
