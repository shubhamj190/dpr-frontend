import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${process.env.REACT_APP_BACKED}product/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
