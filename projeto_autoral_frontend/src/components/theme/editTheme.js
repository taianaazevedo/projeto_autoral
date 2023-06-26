import { useParams } from "react-router-dom";
import { StyledEdit } from "./themeStyle";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  getThemeById,
  updateTitle,
  updateSong,
  updateMovie,
  updateSerie,
  updateBook,
  postSong,
  postMovie,
  postBook,
  postSerie,
} from "../../services/themeApi";
import BackToHome from "../../components/backToHome/buttonToHome";

export default function Edit() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [theme, setTheme] = useState([]);
  const [editTheme, setEditTheme] = useState(false);
  const [editSong, setEditSong] = useState(false);
  const [editMovie, setEditMovie] = useState(false);
  const [editSerie, setEditSerie] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [themeForm, setThemeForm] = useState({ theme: "" });
  const [songForm, setSongForm] = useState({ title: "", performer: "" });
  const [movieForm, setMovieForm] = useState({ title: "", streaming: "" });
  const [serieForm, setSerieForm] = useState({ title: "", streaming: "" });
  const [bookForm, setBookForm] = useState({ title: "", author: "" });

  async function getTheme() {
    try {
      const themeApi = await getThemeById(user.token, id);
      setTheme(themeApi);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  function edit(type) {
    if (type === "theme") return setEditTheme(!editTheme);
    if (type === "song") return setEditSong(!editSong);
    if (type === "movie") return setEditMovie(!editMovie);
    if (type === "serie") return setEditSerie(!editSerie);
    if (type === "book") return setEditBook(!editBook);
  }

  function handleForm(e) {
    setThemeForm({ ...themeForm, [e.target.name]: e.target.value });
  }

  async function handleEditTheme(e) {
    e.preventDefault();
    try {
      await updateTitle(user.token, theme.id, themeForm.theme);
      alert("Título atualizado com sucesso! :)");
      setThemeForm({ theme: "" });
      setEditTheme(false);
    } catch (error) {
      if (error.response.status === 409) {
        alert("Esse tema já existe. Busque por ele na barra de pesquisa! =)");
      }
      if (error.response.status === 400) {
        alert("O título precisa ter mais de 5 caracteres");
      }
    }
  }

  function handleSongForm(e) {
    setSongForm({ ...songForm, [e.target.name]: e.target.value });
  }

  async function handleEditSong(e) {
    e.preventDefault();
    try {
      if (theme.Song.length === 0) {
        await postSong(
          user.token,
          songForm.title,
          songForm.performer,
          theme.id
        );
      } else {
        await updateSong(
          user.token,
          theme.Song[0].id,
          songForm.title,
          songForm.performer
        );
      }

      alert("Música atualizada com sucesso");
      setSongForm({ title: "", performer: "" });
      setEditSong(false);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  function handleMovieForm(e) {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
  }

  async function handleEditMovie(e) {
    e.preventDefault();
    try {
      if (theme.Movie.length === 0) {
        await postMovie(
          user.token,
          movieForm.title,
          movieForm.streaming,
          theme.id
        );
      } else {
        await updateMovie(
          user.token,
          theme.Movie[0].id,
          movieForm.title,
          movieForm.streaming
        );
      }

      alert("Filme atualizado com sucesso");
      setMovieForm({ title: "", streaming: "" });
      setEditMovie(false);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  function handleSerieForm(e) {
    setSerieForm({ ...serieForm, [e.target.name]: e.target.value });
  }

  async function handleEditSerie(e) {
    e.preventDefault();
    try {
      if (theme.Serie.length === 0) {
        await postSerie(
          user.token,
          serieForm.title,
          serieForm.streaming,
          theme.id
        );
      } else {
        await updateSerie(
          user.token,
          theme.Serie[0].id,
          serieForm.title,
          serieForm.streaming
        );
      }
      alert("Série atualizada com sucesso");
      setSerieForm({ title: "", streaming: "" });
      setEditSerie(false);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  function handleBookForm(e) {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  }

  async function handleEditBook(e) {
    e.preventDefault();
    try {
      if (theme.Book.length === 0) {
        await postBook(user.token, bookForm.title, bookForm.author, theme.id);
      } else {
        await updateBook(
          user.token,
          theme.Book[0].id,
          bookForm.title,
          bookForm.author
        );
      }
      alert("Livro atualizado com sucesso");
      setBookForm({ title: "", author: "" });
      setEditBook(false);
    } catch (error) {
      alert("Houve um erro inesperado. Tente novamente");
    }
  }

  useEffect(() => {
    getTheme();
  }, [id]);

  return (
    <>
      <StyledEdit>
        <h1>Edite o tema</h1>
        <div className="theme">
          <p>Tema: {theme?.title}</p>
          <button onClick={() => edit("theme")}>Editar</button>
        </div>
        {editTheme && (
          <form className="edit-theme" onSubmit={handleEditTheme}>
            <input
              type="text"
              placeholder="Edite o tema"
              required
              name="theme"
              value={themeForm.theme}
              onChange={(e) => handleForm(e)}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
        <div className="music">
          <p>
            Música: {theme?.Song?.[0]?.title} - {theme?.Song?.[0]?.performer}
          </p>
          <button onClick={() => edit("song")}>Editar</button>
        </div>
        {editSong && (
          <form className="edit-music" onSubmit={handleEditSong}>
            <input
              type="text"
              placeholder="Edite a música"
              required
              name="title"
              value={songForm.title}
              onChange={(e) => handleSongForm(e)}
            />
            <input
              type="text"
              placeholder="Edite o(a) cantor(a)"
              required
              name="performer"
              value={songForm.performer}
              onChange={(e) => handleSongForm(e)}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
        <div className="movie">
          <p>
            Filme: {theme?.Movie?.[0]?.title} - {theme?.Movie?.[0]?.streaming}
          </p>
          <button onClick={() => edit("movie")}>Editar</button>
        </div>
        {editMovie && (
          <form className="edit-movie" onSubmit={handleEditMovie}>
            <input
              type="text"
              placeholder="Edite o filme"
              required
              name="title"
              value={movieForm.title}
              onChange={(e) => handleMovieForm(e)}
            />
            <input
              type="text"
              placeholder="Edite a plataforma de streaming"
              required
              name="streaming"
              value={movieForm.streaming}
              onChange={(e) => handleMovieForm(e)}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
        <div className="serie">
          <p>
            Serie: {theme?.Serie?.[0]?.title} - {theme?.Serie?.[0]?.streaming}
          </p>
          <button onClick={() => edit("serie")}>Editar</button>
        </div>
        {editSerie && (
          <form className="edit-serie" onSubmit={handleEditSerie}>
            <input
              type="text"
              placeholder="Edite a série"
              required
              name="title"
              value={serieForm.title}
              onChange={(e) => handleSerieForm(e)}
            />
            <input
              type="text"
              placeholder="Edite a plataforma de streaming"
              required
              name="streaming"
              value={serieForm.streaming}
              onChange={(e) => handleSerieForm(e)}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
        <div className="book">
          <p>
            Livro: {theme?.Book?.[0]?.title} - {theme?.Book?.[0]?.author}
          </p>
          <button onClick={() => edit("book")}>Editar</button>
        </div>
        {editBook && (
          <form className="edit-book" onSubmit={handleEditBook}>
            <input
              type="text"
              placeholder="Edite o livro"
              required
              name="title"
              value={bookForm.title}
              onChange={(e) => handleBookForm(e)}
            />
            <input
              type="text"
              placeholder="Edite o(a) autor(a)"
              required
              name="author"
              value={bookForm.author}
              onChange={(e) => handleBookForm(e)}
            />
            <button type="submit">Salvar</button>
          </form>
        )}
      </StyledEdit>
      <BackToHome />
    </>
  );
}
