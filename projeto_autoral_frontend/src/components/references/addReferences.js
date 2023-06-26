import { StyledReferences } from "./referencesStyle";
import SongReference from "./songReference";
import MovieReference from "./movieReference";
import SerieReference from "./serieReference";
import BookReference from "./bookReference";

export default function References({ id }) {
  return (
    <>
      <StyledReferences>
        <h1>Referências:</h1>
        <SongReference id={id}/>
        <MovieReference id={id}/>
        <SerieReference id={id}/>
        <BookReference id={id}/>
      </StyledReferences>
    </>
  );
}
