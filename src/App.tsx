import * as React from "react";
import * as Papa from "papaparse";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Link,
  Image,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  theme,
  Container,
  Flex,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import SearchForm from "./SearchForm";
import logoSrc from "./logo.png";

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: "Cabin, sans-serif",
  },
};

export const App = () => {
  const [data, setData] = React.useState([]);
  const [matchedData, setMatchedData] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);

  const loadData = async () => {
    const response = await fetch("/data.csv");
    const csvText = await response.text();
    const { data = [] } = Papa.parse(csvText, { header: true });
    setData(data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (value: string = "") => {
    setNotFound(false);
    const matches = data.filter((item) => {
      const suburbName: string = item["Suburb Name"] || "";
      const postcode: string = item["Suburb Postcode"] || "";
      return (
        suburbName.toLowerCase().includes(value.toLowerCase()) ||
        postcode.toLowerCase().includes(value.toLowerCase())
      );
    });
    setMatchedData(matches);
    if (!matches.length) {
      setNotFound(true);
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box textAlign="center">
        <Grid minH="100vh" p={3} bg="#f3ebe2">
          <Container maxW="100ch">
            <VStack spacing={8}>
              <Box mb="6">
                <SearchForm onSubmit={handleSearch} />
              </Box>
              {notFound && (
                <VStack spacing={8}>
                  <Image src={logoSrc} height="50px" />
                  <Container>
                    <Flex alignItems="center" ml={4}>
                      <WarningIcon w={10} h={10} mr={4} color="orange.300" />
                      <Box textAlign="left">
                        Sorry, we can’t deliver to your area at moment. Please
                        contact{" "}
                        <Link
                          href="mailto:info@ommis.com.au"
                          color="orange.600"
                        >
                          info@ommis.com.au
                        </Link>{" "}
                        and we will get a delivery quote for you.
                      </Box>
                    </Flex>
                  </Container>
                </VStack>
              )}
              {!!matchedData.length && (
                <Table
                  variant="striped"
                  borderColor="orange.300"
                  borderWidth="lg"
                  borderRadius="lg"
                  bg="white"
                  colorScheme="orange"
                  size="lg"
                >
                  <Thead>
                    <Tr>
                      {Object.keys(matchedData[0]).map((key) => (
                        <Th key={`header-${key}`}>{key}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {matchedData.map((item, i) => (
                      <Tr key={`row-${i}`}>
                        {Object.keys(matchedData[0]).map((key, j) => (
                          <Td key={`row-${i}-${j}`}>
                            {(item[key] as string).replace(/^\?/, "")}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </VStack>
          </Container>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
