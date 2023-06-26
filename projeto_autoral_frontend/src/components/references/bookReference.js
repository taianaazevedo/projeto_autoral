import { useForm } from "react-hook-form";
import { StyledForm } from "./referencesStyle";
import { postBook } from "../../services/themeApi";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";

export default function BookReference({ id }) {
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
      const posted = await postBook(user.token, data.Book, data.Author, id);
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
        <p>Livro</p>
        <form onSubmit={handleSubmit(post)}>
          <input
            type="text"
            placeholder="Nome do livro"
            name="Book"
            {...register("Book", { required: true })}
            aria-invalid={errors.Book ? "true" : "false"}
          />
          {errors.Book?.type === "required" && (
            <p className="alert">Book is required</p>
          )}
          <input
            type="text"
            placeholder="Autor(a)"
            name="Author"
            {...register("Author", { required: true })}
            aria-invalid={errors.Author ? "true" : "false"}
          />
          {errors.Author?.type === "required" && (
            <p className="alert">Author is required</p>
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
