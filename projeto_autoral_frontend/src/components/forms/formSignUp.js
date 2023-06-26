import { useForm } from "react-hook-form";
import { StyledForm } from "./formStyle";
import { useRef } from "react";
import { signUp } from "../../services/signUpApi";
import { useNavigate } from "react-router-dom";

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("Senha", "");

  async function onSubmit(data) {
    try {
      await signUp(
        data.Nome,
        data.Email,
        data.Senha,
        data.ConfirmPassword,
        data.Url
      );
      navigate("/sign-in");
    } catch (error) {
      if (error.response.status === 409) {
        alert("O e-mail já está em uso.");
      }
      if (error.response.status === 400) {
        alert("Dados inválidos. Confira a url e verifique se a senha tem pelo menos 6 dígitos");
      }
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Nome"
        {...register("Nome", { required: true })}
        aria-invalid={errors.Nome ? "true" : "false"}
      />
      {errors.Nome?.type === "required" && (
        <p className="alert">Name is required</p>
      )}
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
        type="text"
        name="Url"
        placeholder="Url da sua foto"
        {...register("Url", { required: true })}
        aria-invalid={errors.Url ? "true" : "false"}
      />
      {errors.Url?.type === "required" && (
        <p className="alert">Url is required</p>
      )}
      <input
        type="password"
        placeholder="Senha"
        {...register("Senha", { required: "Password is required" })}
        aria-invalid={errors.Senha ? "true" : "false"}
      />
      {errors.Senha && <p className="alert">Password is required</p>}
      <input
        type="password"
        name="ConfirmPassword"
        placeholder="Confirme a senha"
        {...register("ConfirmPassword", {
          required: "Confirm password is required",
          validate: (value) =>
            value === password.current || "Passwords don't match",
        })}
        aria-invalid={errors.ConfirmPassword ? "true" : "false"}
      />
      {errors.ConfirmPassword && (
        <p className="alert">{errors.ConfirmPassword?.message}</p>
      )}
      <button type="submit" placeholder="Entrar">
        Cadastrar
      </button>
    </StyledForm>
  );
}
