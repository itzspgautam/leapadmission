import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaYoutube } from "react-icons/fa";

const TestPreps = ({ preps }) => {
  return (
    <Box bg="gray.200">
      <Container py="16" maxW={["100vw", "80vw"]}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={6}
        >
          {preps?.preps?.map((prep) => (
            <GridItem
              w="100%"
              bg="white"
              borderRadius={"lg"}
              p="4"
              key={prep._id}
            >
              <AspectRatio
                bg="gray.100"
                ratio={1920 / 1080}
                borderRadius="lg"
                overflow={"hidden"}
              >
                <Image src={prep.poster} alt={prep.title} />
              </AspectRatio>
              <Box pt="4">
                <Heading color={"gray.900"} as="h3" fontSize={24} mt="2">
                  IELTS Preperation Full Course
                </Heading>
                <Text color={"gray.600"} mt="1" mb="2">
                  Credit: Youtuber Channel Name
                </Text>
                <hr />

                <Link href={`/preps/${prep._id}`}>
                  <Button
                    mt="6"
                    colorScheme={"red"}
                    w="100%"
                    leftIcon={<FaYoutube size="30" />}
                  >
                    Watch Now
                  </Button>
                </Link>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

TestPreps.getInitialProps = async function () {
  const res = await axios.get(process.env.ENDPOINT + "/api/preps");
  const preps = res.data;
  return { preps };
};

export default TestPreps;
