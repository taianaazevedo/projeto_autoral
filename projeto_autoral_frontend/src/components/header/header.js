import { useContext, useEffect, useState, useRef } from "react";
import { HeaderContainer } from "./headerStyle";
import { AiOutlineMenu } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import Menu from "../menu/menu";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { getThemeBySearch } from "../../services/themeApi";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  function handleMenu() {
    setShowMenu(!showMenu);
  }

  async function getSearch(e) {
    const search = e.target.value;
    try {
      setIsSearching(true);

      if (search === "") {
        setIsSearching(false);
        return;
      }
      const result = await getThemeBySearch(user.token, search);
      setResultSearch(result)
    } catch (error) {
      alert(error.result.data.message);
      setIsSearching(false);
    }
  }
  
  function navigateToTheme(id){
    navigate(`/theme/${id}`)
    setIsSearching(false)
  }

  function logout() {
    setUser({});
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/");
    }
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <HeaderContainer>
        <AiOutlineMenu
          style={{ color: "white", margin: "15px", cursor: "pointer" }}
          size={30}
          onClick={handleMenu}
        />
        <div className="searchBar">
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            placeholder="Pesquise o tema por palavra-chave"
            value={search}
            onChange={(e) => getSearch(e)}
          />
          {isSearching ? (
            <ul ref={searchBarRef}>
              {resultSearch?.length ? (
                resultSearch.map((theme) => (
                  <li key={theme.id} onClick={() => navigateToTheme(theme.id)}>• {theme.title}</li>
                ))
              ) : (
                <li>Nenhum resultado encontrado</li>
              )}
            </ul>
          ) : null}
        </div>

        <RxExit
          style={{ color: "white", margin: "15px", cursor: "pointer" }}
          size={30}
          onClick={logout}
        />
      </HeaderContainer>
      {showMenu && <Menu />}
    </>
  );
}
