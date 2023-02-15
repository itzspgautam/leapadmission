import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";
import React from "react";

const Prep = ({ prep }) => {
  return (
    <Box pt="10" p="5" bg="gray.200">
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
      >
        <GridItem w="100%" bg="white" borderRadius={"lg"} p="4">
          <AspectRatio
            bg="gray.100"
            ratio={1920 / 1080}
            borderRadius="lg"
            overflow={"hidden"}
          >
            <iframe title="naruto" src={prep.link} onPlayback />
          </AspectRatio>
        </GridItem>
        <GridItem w="100%" bg="white" borderRadius={"lg"} p="4">
          <Box>
            <Heading color={"gray.900"} as="h1" fontSize={35}>
              {prep.title}
            </Heading>
          </Box>

          <Tabs>
            <TabList justifyContent={"space-between"}>
              <Tab>Timestamps</Tab>
              <Tab>Credit</Tab>
              <Tab>Info</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex mt="4" gap={2} flexDir="column">
                  {prep?.timestamp?.map((t) => (
                    <Link
                      key={t._id}
                      target="_blank"
                      href={`${prep.link.replace("embed/", "watch?v=")}&t=${
                        t.time
                      }s`}
                    >
                      <Button
                        w="100%"
                        variant={"outline"}
                        _hover={{ bg: "teal", color: "white" }}
                        justifyContent={"flex-start"}
                        colorScheme={"teal"}
                        borderRadius="sm"
                      >
                        {t.title}
                      </Button>
                    </Link>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel>{prep.credit}</TabPanel>
              <TabPanel>
                <Text>
                  Posted on : {moment(prep.createdAt).format("DD MMM, YYYY")}
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    process.env.ENDPOINT + `/api/preps/${params.id}`
  );
  return {
    props: { prep: data.prep },
  };
}

export default Prep;
