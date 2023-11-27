import { toast } from "./toast.js";

const baseUrl = "https://dummyjson.com";

const token = JSON.parse(localStorage.getItem("@diamond:token")) || "";

export const red = "#df1545";
export const green = "#36B37E";

export const loginRequest = async (userCredentials) => {
  const token = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  }).then(async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      const response = await res.json();
      toast(red, "E-mail ou senha inválido(a).");
      return response;
    }
  });

  return token;
};

export const getUserData = async (userId) => {
  const user = await fetch(`${baseUrl}/auth/user/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      const response = await res.json();
      toast(red, "Algo deu errado, tente novamente mais tarde");
      return response;
    }
  });

  return user;
};
