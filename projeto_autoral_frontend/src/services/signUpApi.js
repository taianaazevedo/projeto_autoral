import api from "./api";

export async function signUp(name, email, password, confirmPassword, imgUrl) {
  const response = await api.post("/sign-up", {
    name,
    email,
    password,
    confirmPassword,
    imgUrl,
  });
  return response.data;
}
