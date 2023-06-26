import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/userContext";
import SignIn from "./pages/signInPage/signIn";
import SignUp from "./pages/signUpPage/signUp";
import Home from "./pages/homePage/home";
import ThemePage from "./pages/themePage/themePage";
import FirstPage from "./pages/firstPage/firstPage";
import PostTheme from "./pages/postPage/postTheme";
import Favorite from "./pages/favoritePage/favorite";
import MyThemes from "./pages/myThemesPage/myThemes";
import EditPage from "./pages/editPage/editPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/theme/:id" element={<ThemePage />} />
            <Route path="/theme/create-theme" element={<PostTheme />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/my-profile" element={<MyThemes />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
