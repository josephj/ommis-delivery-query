import * as React from "react";
import * as Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
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

const isEmbedded = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const sendHeightToParent = () => {
  if (!isEmbedded()) return;

  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: "ommis-height-update", height }, "*");
};

export const App = () => {
  const [data, setData] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    const response = await fetch("/data.csv");
    const csvText = await response.text();
    const { data = [] } = Papa.parse(csvText, { header: true });
    setData(data as any);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!isEmbedded()) return;

    const timeoutId = setTimeout(sendHeightToParent, 500);
    const resizeObserver = new ResizeObserver(() => {
      sendHeightToParent();
    });

    if (appRef.current) {
      resizeObserver.observe(appRef.current);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "ommis-parent-resize") {
        sendHeightToParent();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (isEmbedded()) {
      sendHeightToParent();
    }
  }, [matchedData, notFound]);

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
      <Box textAlign="center" ref={appRef}>
        <Grid minH="100vh" p={3} bg="#f3f3f3">
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
                        Sorry, we can't deliver to your area at moment. Please
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
                  colorScheme="red"
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
