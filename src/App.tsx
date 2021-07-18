import * as React from "react";
import * as Papa from "papaparse";
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  Table,
  Tr,
  Th,
  Tbody,
  Thead,
  theme,
} from "@chakra-ui/react";
import SearchForm from "./SearchForm";

export const App = () => {
  const [data, setData] = React.useState([]);
  const [matchedData, setMatchedData] = React.useState([]);

  const loadData = async () => {
    const response = await fetch("/data.csv");
    const csvText = await response.text();
    const { data = [] } = Papa.parse(csvText, { header: true });
    setData(data);
    console.log(data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (value: string = "") => {
    const matches = data.filter((item) => {
      const suburbName: string = item["Suburb Name"] || "";
      const postcode: string = item["Suburb Postcode"] || "";
      return (
        suburbName.toLowerCase().includes(value.toLowerCase()) ||
        postcode.toLowerCase().includes(value.toLowerCase())
      );
    });
    if (matches.length) setMatchedData(matches);
    console.log("matches", matches);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg="#f3ebe2">
          <VStack spacing={8}>
            <SearchForm onSubmit={handleSearch} />
            {!!matchedData.length && (
              <Table variant="simple" bg="white" borderRadius="md">
                <Thead>
                  <Tr>
                    <Th>Postcode</Th>
                    <Th>Suburb</Th>
                    <Th>Region</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {matchedData.map((item) => (
                    <Tr>
                      <Th>{item["Suburb Postcode"]}</Th>
                      <Th>{item["Suburb Name"]}</Th>
                      <Th>{item["Zone Name"]}</Th>
                      <Th>TBD</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
