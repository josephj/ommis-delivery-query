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
    <form role="search" onSubmit={handleSubmit}>
      <VStack spacing="4">
        <FormControl>
          <FormLabel htmlFor="keyword" my="8" color="gray.600">
            Check Order &amp; Delivery / Pick Up Information according to where
            you live:
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              alignItems="center"
              justifyContent="center"
              height="47px"
            >
              <Search2Icon color="gray.300" w="5" h="5" alignSelf="center" />
            </InputLeftElement>
            <Input
              borderRadius="3xl"
              bg="white"
              colorScheme="red"
              id="keyword"
              type="search"
              name="keyword"
              spellCheck="false"
              placeholder="Your postcode or suburb name"
              focusBorderColor="red.300"
              mr="4"
              size="lg"
              value={inputValue}
              ref={inputRef}
              onChange={handleChange}
              onAbort={handleChange}
            />
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              borderRadius="3xl"
              disabled={inputValue.length === 0}
            >
              Check
            </Button>
          </InputGroup>
          {/* <FormHelperText fontSize="sm" textAlign="right">
          (e.g. 2000, or Sydney)
        </FormHelperText> */}
        </FormControl>
      </VStack>
    </form>
  );
};

export default SearchForm;
