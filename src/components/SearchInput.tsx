import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";

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
          ref.current.value = "";
        }
      }}
    >
      <InputGroup h={"80px"} alignItems={"center"}>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder={placeholder}
          variant="filled"
          aria-label={label || "Search"}
        ></Input>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
