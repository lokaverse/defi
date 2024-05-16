import axios from "axios";

export const getHashrateHistory = (username) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/v1/histories/${username}`;
  return axios.get(endpoint);
};

export const getMinerInfo = (username) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/v1/rigs/${username}`;
  return axios.get(endpoint);
};

export const lastEarning = async (username) => {
  try {
    const endpoint = `${process.env.REACT_APP_BACKEND_URL}/v1/last-earning/${username}`;
    const res = await axios.get(endpoint);
    if (res?.data?.earningPerTh) {
      return res.data.earningPerTh;
    }
    return 0;
  } catch (error) {
    return 0;
  }
};
