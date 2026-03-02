import { useLocation, useNavigate } from 'react-router-dom';

export const useFilterSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getParams = () => new URLSearchParams(location.search);

  const getParam = (key: string) => getParams().get(key);

  const setParam = (key: string, value: string) => {
    const params = getParams();
    params.set(key, value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const deleteParam = (key: string) => {
    const params = getParams();
    params.delete(key);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return { getParam, setParam, deleteParam, getParams };
};
