import isNil from "lodash.isnil";
import React, { useEffect, useRef, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";

type SearchFormProps = {
  value?: string;
  defaultValue?: string;
  onSubmit?: (keyword: string) => void;
};

export const SearchForm = ({
  value,
  defaultValue = "",
  onSubmit = () => {},
}: SearchFormProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const inputRef = useRef();
  useEffect(() => {
    // @ts-ignore
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!isNil(value)) setInputValue(value);
  }, [value]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    setInputValue(currentValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form role="search" onSubmit={handleSubmit} style={{ width: "50%" }}>
      <VStack spacing="4">
        <FormControl>
          <FormLabel htmlFor="keyword" mb="4">
            Check Order &amp; Delivery / Pick Up Information according to where
            you live:
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              borderRadius="3xl"
              bg="white"
              id="keyword"
              type="search"
              name="keyword"
              spellCheck="false"
              placeholder="Your postcode or suburb name"
              value={inputValue}
              ref={inputRef}
              onChange={handleChange}
              onAbort={handleChange}
            />
          </InputGroup>
          {/* <FormHelperText fontSize="sm" textAlign="right">
          (e.g. 2000, or Sydney)
        </FormHelperText> */}
        </FormControl>
        <Button type="submit" colorScheme="teal" size="lg" borderRadius="3xl">
          Check
        </Button>
      </VStack>
    </form>
  );
};

export default SearchForm;
