import { AppConfig } from "@/Config/AppConfig";
import UserActions from "@/State/Actions/UserActions";
import { getToken } from "@/Utils/AuthStorage";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Link,
  Icon,
  Card,
  Center,
  Avatar,
  IconButton,
  Flex,
  Button,
  Badge,
  Skeleton,
  SkeletonCircle,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";

const UserCardGrid = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [testiM, settestiM] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(null);

  const fetchTsm = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${AppConfig.API_ENDPOINT}/testimonials/gettestimonials`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settestiM(data.testimonials);
      setLoading(false);
    } catch (error) {
      dispatch(UserActions.logout());
      router.replace("/admin");
    }
  };

  const updateCallback = async (_id, status) => {
    setBtnLoading(_id);
    const token = await getToken();
    const { data } = await axios.put(
      `${AppConfig.API_ENDPOINT}/testimonials/${_id}?status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTsm();
    setBtnLoading(null);
  };

  useEffect(() => {
    fetchTsm();
  }, []);

  return (
    <Box bg="gray.300" h="full" minH="100vh">
      <Grid
        p="5"
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <GridItem key={i}>
                <Skeleton h="250px"></Skeleton>
              </GridItem>
            ))}
          </>
        ) : (
          testiM.map((cb) => (
            <GridItem key={cb?._id}>
              <Card
                overflow={"hidden"}
                h="100%"
                justifyContent={"space-between"}
                p={0}
              >
                <Center flexDir={"column"} pt="0">
                  <Badge
                    w="100%"
                    size="sm"
                    textAlign={"center"}
                    colorScheme={
                      cb?.status === "published"
                        ? "green"
                        : cb?.status === "draft"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {cb?.status}
                  </Badge>

                  <Box flexDirection={"column"} p="2">
                    <Avatar name={cb?.author} src={cb?.avatarURL} />
                    <Text mt="2" fontWeight={"bold"} color={"blackAlpha.900"}>
                      {cb?.author}
                    </Text>
                    <Text
                      fontWeight={"medium"}
                      color={"blackAlpha.800"}
                      fontSize="12"
                    >
                      {cb?.description}
                    </Text>{" "}
                    <hr />
                    <br />
                    <Text
                      fontWeight={"light"}
                      color={"blackAlpha.800"}
                      fontSize="12"
                    >
                      Received on:{" "}
                      {moment(cb?.createdAt).format("MMM DD, YYYY | HH:mm")}
                    </Text>
                    <Text
                      p="1"
                      border="1px solid"
                      borderColor={"blackAlpha.100"}
                      mt="2"
                      w="100%"
                      fontSize={12}
                    >
                      <span dangerouslySetInnerHTML={{ __html: cb?.message }} />
                    </Text>
                  </Box>
                </Center>
                <Center flexDir={"column"} p="2">
                  <Flex mt="5" gap="2" w="100%">
                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      href={`mailto:${cb?.email}`}
                    >
                      <Button
                        size="sm"
                        borderRadius={"sm"}
                        colorScheme="red"
                        w="100%"
                        isDisabled={cb?.email ? false : true}
                        textDecor="none"
                      >
                        Email
                      </Button>
                    </Link>

                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      href={`tel:${cb?.phone}`}
                    >
                      <Button
                        size="sm"
                        borderRadius={"sm"}
                        colorScheme="blue"
                        w="100%"
                        isDisabled={cb?.phone ? false : true}
                      >
                        Call
                      </Button>
                    </Link>
                  </Flex>
                  <Button
                    isLoading={btnLoading === cb._id ? true : false}
                    mt="2"
                    size="sm"
                    borderRadius={"sm"}
                    colorScheme="blackAlpha"
                    variant={"outline"}
                    w="100%"
                    onClick={() =>
                      updateCallback(
                        cb?._id,
                        cb?.status === "draft" ? "published" : "draft"
                      )
                    }
                  >
                    Mark as {cb?.status === "draft" ? "published" : "draft"}
                  </Button>
                </Center>
              </Card>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default UserCardGrid;
