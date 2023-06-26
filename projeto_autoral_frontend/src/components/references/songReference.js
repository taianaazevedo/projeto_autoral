import { useForm } from "react-hook-form";
import { StyledForm } from "./referencesStyle";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { postSong } from "../../services/themeApi";

export default function SongReference({ id }) {
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
      const posted = await postSong(user.token, data.Music, data.Singer, id);
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
        <p>Música</p>
        <form onSubmit={handleSubmit(post)}>
          <input
            type="text"
            placeholder="Nome da música"
            name="Music"
            {...register("Music", { required: true })}
            aria-invalid={errors.Music ? "true" : "false"}
          />
          {errors.Music?.type === "required" && (
            <p className="alert">Music is required</p>
          )}
          <input
            type="text"
            placeholder="Cantor(a)"
            name="Singer"
            {...register("Singer", { required: true })}
            aria-invalid={errors.Singer ? "true" : "false"}
          />
          {errors.Singer?.type === "required" && (
            <p className="alert">Singer is required</p>
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
