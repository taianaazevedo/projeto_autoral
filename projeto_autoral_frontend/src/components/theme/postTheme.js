import { useForm } from "react-hook-form";
import { StyledPost } from "./postThemeStyle";
import BackToHome from "../backToHome/buttonToHome";
import References from "../references/addReferences";
import { postTheme } from "../../services/themeApi";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";

export default function Post() {
  const { user } = useContext(UserContext);
  const [id, setId] = useState(null);
  const [send, setSend] = useState("Criar");
  const [isDisable, setIsDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function post(data) {
    try {
      const themeCreated = await postTheme(user.token, data.Tema);
      setId(themeCreated.id);
      setSend("✓");
      setIsDisable(true);
    } catch (error) {
      if (error.response.status === 409) {
        alert("Esse tema já existe. Busque por ele na barra de pesquisa! =)");
      }
      if (error.response.status === 400) {
        alert("O título precisa ter mais de 5 caracteres");
      }
      setSend("Criar");
      setIsDisable(false);
    }
  }

  return (
    <>
      <StyledPost>
        <h1>Crie seu tema:</h1>
        <form onSubmit={handleSubmit(post)}>
          <input
            type="text"
            placeholder="Título do tema"
            name="Tema"
            {...register("Tema", { required: true })}
            aria-invalid={errors.Tema ? "true" : "false"}
          />
          {errors.Tema?.type === "required" && (
            <p className="alert">Title is required</p>
          )}
          <button
            type="submit"
            placeholder="Enviar"
            disabled={isDisable}
            style={{ background: isDisable ? "grey" : "#ffa438" }}
          >
            {send}
          </button>
        </form>
      </StyledPost>
      <References id={id} />
      <BackToHome />
    </>
  );
}
