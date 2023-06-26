import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import ThemeById from "../../components/theme/themeById";

export default function ThemePage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <ThemeById id={id} />
    </>
  );
}
