import React, { FC } from 'react';
// import { useLocation } from 'react-router-dom'

// import { getChar } from '../store/reducers/rootReducer'

export const Pagination: FC = () => {
  // const location = useLocation()
  // const navigate = useNavigate()

  // const info = useSelector((store) => store.account.pages)

  // const nextPage = info.next
  //   ? info.next.split('https://rickandmortyapi.com/api/character')[1]
  //   : ''
  // const prevPage = info.prev
  //   ? info.prev.split('https://rickandmortyapi.com/api/character')[1]
  //   : ''

  return (
    <div className="pagination">
      <div
      //className={info.pages > 1 ? 'paginConteiner' : 'hideWindow'}
      >
        <button
          className="btn"
          key="prevPage"
          type="button"
          onClick={() => {
            // if (info.prev !== null) {
            //   navigate(`${path}${prevPage}`)
            //   dispatch(getChar(prevPage))
            // }
          }}>
          prev
        </button>
        <div className="pgNubr">
          {/* {location.search.match(/\d+/) === null
            ? '1'
            : location.search.match(/\d+/).join('')}{' '}
          of {info.pages} */}
        </div>
        <button
          className="btn"
          key="nextPage"
          type="button"
          onClick={() => {
            // if (info.next !== null) {
            //   navigate(`${url}${nextPage}`)
            //   dispatch(getChar(nextPage))
            // }
          }}>
          next
        </button>
      </div>
    </div>
  );
};
