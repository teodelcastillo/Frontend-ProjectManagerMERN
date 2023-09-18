import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  placeholder?: string;
  label?: string; // Add a label prop for accessibility
}

const SearchInput = ({ onSearch, placeholder, label }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          const searchText = ref.current.value;
          onSearch(searchText);
          ref.current.value = ""; // Clear the input field
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder={placeholder}
          variant="filled"
          aria-label={label || "Search"} // Use the label prop for accessibility
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
