import axios from 'axios';

const ADD_CHARACTERS = 'ADD_CHARACTERS';
const SET_BASE = 'SET_BASE';
const SET_SELECTED = 'SET_SELECTED';
const SET_DETAILS = 'SET_DETAILS';
const SET_INTEREST = 'SET_INTEREST';
const ADD_PAGES = 'ADD_PAGES';

const initialState = {
  button: 'All',
  details: 'hideDetails',
  list: [],
  select: [],
  interest: [],
  pages: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTERS:
      return { ...state, list: action.list };
    case ADD_PAGES:
      return { ...state, pages: action.info };
    case SET_BASE:
      return { ...state, button: action.base };

    case SET_DETAILS:
      return { ...state, details: action.show };

    case SET_SELECTED:
      // const selectArr =
      //   +state.select.filter((it) => it === action.id).join() === action.id
      //     ? state.select.filter((it) => it !== action.id)
      //     : [...state.select, action.id];

      // eslint-disable-next-line no-undef
      return { ...state, select: selectArr };
    case SET_INTEREST:
      return { ...state, interest: action.arr };

    default:
      return state;
  }
};

export default reducer;

export function getChar(url) {
  return function getFoo(dispatch) {
    axios(`https://rickandmortyapi.com/api/character${url}`).then(({ data }) => {
      const { info } = data;
      dispatch({ type: ADD_PAGES, info });
      const { results } = data;
      axios
        .all(results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl)))
        .then((allNamesData) => allNamesData.map(({ data }) => data.name))
        .then((allNamesArr) => {
          const ser = results.map((it, id) => {
            return { ...it, episode: allNamesArr[id] };
          });
          dispatch({ type: ADD_CHARACTERS, list: ser });
        });
    });
  };
}

export function getSele(url) {
  return function getFoo(dispatch) {
    dispatch({ type: ADD_PAGES, info: { pages: 1, next: null, prev: null } });
    if (url.length > 1) {
      axios(`https://rickandmortyapi.com/api/character/${url}`).then(({ data }) => {
        const results = data;
        axios
          .all(results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl)))
          .then((allNamesData) => allNamesData.map(({ data }) => data.name))
          .then((allNamesArr) => {
            const ser = results.map((it, id) => {
              return { ...it, episode: allNamesArr[id] };
            });
            dispatch({ type: ADD_CHARACTERS, list: ser });
          });
      });
    } else {
      axios(`https://rickandmortyapi.com/api/character/${url}`).then(({ data }) => {
        const res = [data];
        axios(res[0].episode[0]).then(({ data }) => {
          const ser = res.map((it) => {
            return { ...it, episode: data.name };
          });
          dispatch({ type: ADD_CHARACTERS, list: ser });
        });
      });
    }
  };
}

export function getRandom(...arr) {
  return function getFoo(dispatch) {
    axios(`https://rickandmortyapi.com/api/character/${arr}`).then(({ data }) => {
      const results = data;
      axios
        .all(results.map((it) => it.episode[0]).map((epiUrl) => axios(epiUrl)))
        .then((allNamesData) => allNamesData.map(({ data }) => data.name))
        .then((allNamesArr) => {
          const arr = results.map((it, id) => {
            return { ...it, episode: allNamesArr[id] };
          });
          dispatch({ type: SET_INTEREST, arr });
        });
    });
  };
}

export function setBase(base) {
  return { type: SET_BASE, base };
}

export function setDetails(show) {
  if (show === 'hideDetails') {
    return function getFoo(dispatch) {
      dispatch({ type: SET_DETAILS, show });
    };
  }
  return function getFoo(dispatch) {
    axios(`https://rickandmortyapi.com/api/character/${show}`).then(({ data }) => {
      const res = data;
      axios
        .all(res.episode.map((epiUrl) => axios(epiUrl)))
        .then((allEpisodesData) => allEpisodesData.map((it) => it.data))
        .then((allEpisodes) =>
          dispatch({
            type: SET_DETAILS,
            show: { ...res, episode: allEpisodes },
          }),
        );
    });
  };
}

export function setSelected(id) {
  return { type: SET_SELECTED, id };
}
