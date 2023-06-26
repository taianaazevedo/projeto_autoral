import { useForm } from "react-hook-form";
import { StyledForm } from "./formStyle";
import { signIn } from "../../services/loginApi";
import { useNavigate } from "react-router-dom";

export default function FormSignIn({ setUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const userData = await signIn(data.Email, data.Senha);
      const { id, name, imgUrl, token } = userData
      setUser({id, name, imgUrl, token})
      localStorage.setItem("user", JSON.stringify({ id, name, imgUrl, token }))     
      navigate("/home")
    } catch (error) {
      alert("Email ou senha incorretos.")
    }   
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        aria-invalid={errors.Email ? "true" : "false"}
      />
      {errors.Email?.type === "required" && (
        <p className="alert">Email is required</p>
      )}
      <input
        type="password"
        placeholder="Senha"
        {...register("Senha", { required: "Password is required" })}
        aria-invalid={errors.Senha ? "true" : "false"}
      />
      {errors.Senha && <p className="alert">{errors.Senha?.message}</p>}
      <button type="submit" placeholder="Entrar">
        Entrar
      </button>
    </StyledForm>
  );
}
