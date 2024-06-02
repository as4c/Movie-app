import Input from "../../commons/Input";
import "./SearchInput.css";

export const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <div className="searchbar-container">
      <label id="search-label" htmlFor="search">
        Search
      </label>
      <Input
        className="search-input"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="type to search..."
      />
    </div>
  );
};
