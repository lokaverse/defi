import axios from "axios";

export const handleLogin = (payload) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/v1/auth/login`;
  return axios.post(endpoint, payload);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     const responseData = {
  //       type: "string",
  //       accessToken: "string",
  //       user: {
  //         id: 0,
  //         username: "john",
  //         email: "jhon@gmail.com",
  //         wallet: "string",
  //         profitability: 0,
  //         unpaid: 0,
  //         balance: 0,
  //         created_at: "2021-01-01T00:00:00.000Z",
  //       },
  //     };
  //     resolve(responseData);
  //   }, 2000);
  // });
};

export const handleRegister = (payload) => {
  const endpoint = `${process.env.REACT_APP_BACKEND_URL}/v1/auth/register`;
  return axios.post(endpoint, payload);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     const responseData = {
  //       id: 0,
  //       username: "john",
  //       email: "jhon@gmail.com",
  //       wallet: "aslkdjalksjdlaj23k4j23429s89df",
  //       profitability: 0,
  //       unpaid: 0,
  //       balance: 0,
  //       created_at: "2021-01-01T00:00:00.000Z",
  //     };
  //     resolve(responseData);
  //   }, 2000);
  // });
};
