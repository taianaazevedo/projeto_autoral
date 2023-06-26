import { useForm } from "react-hook-form";
import { StyledForm } from "./referencesStyle";
import { postSerie } from "../../services/themeApi";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";

export default function SerieReference({ id }) {
  const { user } = useContext(UserContext);
  const [send, setSend] = useState("Criar");
  const [isDisable, setIsDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function post(data) {
    try {
      const posted = await postSerie(
        user.token,
        data.Serie,
        data.Streaming,
        id
      );
      setSend("✓");
      setIsDisable(true);
    } catch (error) {
      alert("Erro ao salvar a referência. Tente novamente.");
      setSend("Criar");
      setIsDisable(false);
    }
  }

  return (
    <>
      <StyledForm>
        <p>Série</p>
        <form onSubmit={handleSubmit(post)}>
          <input
            type="text"
            placeholder="Nome da série"
            name="Serie"
            {...register("Serie", { required: true })}
            aria-invalid={errors.Serie ? "true" : "false"}
          />
          {errors.Serie?.type === "required" && (
            <p className="alert">Serie is required</p>
          )}
          <input
            type="text"
            placeholder="Onde assistir"
            name="Streaming"
            {...register("Streaming", { required: true })}
            aria-invalid={errors.Streaming ? "true" : "false"}
          />
          {errors.Streaming?.type === "required" && (
            <p className="alert">Streaming is required</p>
          )}
          <button
            type="submit"
            placeholder="Enviar"
            style={{ background: isDisable ? "grey" : "#ffa438" }}
            disabled={isDisable}
          >
            {send}
          </button>
        </form>
      </StyledForm>
    </>
  );
}
