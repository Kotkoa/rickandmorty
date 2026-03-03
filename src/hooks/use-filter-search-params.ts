import { useLocation, useNavigate } from 'react-router-dom';

import { CharacterFiltersE } from '@/types/common.types';

export const useFilterSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getParams = () => new URLSearchParams(location.search);

  const getParam = (key: CharacterFiltersE) => getParams().get(key);

  const setParam = (key: CharacterFiltersE, value: string) => {
    const params = getParams();
    params.set(key, value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const deleteParam = (key: CharacterFiltersE) => {
    const params = getParams();
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return { getParam, setParam, deleteParam, getParams };
};
