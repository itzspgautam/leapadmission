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
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";

const UserCardGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${AppConfig.API_ENDPOINT}/users`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      dispatch(UserActions.logout());
      router.replace("/admin");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box bg="gray.300" h="full" minH={"100vh"}>
      <Grid
        p="5"
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={6}
      >
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GridItem key={i}>
                <Skeleton h="250px"></Skeleton>
              </GridItem>
            ))}
          </>
        ) : (
          users.map((user) => (
            <GridItem key={user._id.$oid}>
              <Card overflow={"hidden"}>
                <IconButton
                  icon={
                    user.providerId === "facebook.com" ? (
                      <FaFacebook />
                    ) : user.providerId === "google.com" ? (
                      <FaGoogle />
                    ) : (
                      <FaPhone />
                    )
                  }
                  colorScheme="gray"
                  justifyContent="center"
                  w="5"
                  borderRadius={"0 0 10px 0"}
                  size="sm"
                  title={`Registered with ${user.providerId}`}
                />
                <Center flexDirection={"column"} p="2">
                  <Avatar
                    size="xl"
                    name={user?.displayName}
                    g
                    src={user?.photoURL}
                  />
                  <Text mt="2" fontWeight={"bold"} color={"blackAlpha.900"}>
                    {user?.displayName ? user?.displayName : "Not Updated"}
                  </Text>
                  <Text
                    fontWeight={"light"}
                    color={"blackAlpha.800"}
                    fontSize="12"
                  >
                    Registered on:{" "}
                    {moment(user?.createdAt).format("MMM DD, YYYY")}
                  </Text>
                  <Badge colorScheme={"green"}>{user?.role}</Badge>

                  <Flex mt="5" gap="2" w="100%">
                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      href={`mailto:${user?.email}`}
                    >
                      <Button
                        size="sm"
                        borderRadius={"sm"}
                        colorScheme="red"
                        w="100%"
                        isDisabled={user?.email ? false : true}
                        textDecor="none"
                      >
                        Email
                      </Button>
                    </Link>

                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      href={`tel:${user?.phoneNumber}`}
                    >
                      <Button
                        size="sm"
                        borderRadius={"sm"}
                        colorScheme="blue"
                        w="100%"
                        isDisabled={user?.phoneNumber ? false : true}
                      >
                        Call
                      </Button>
                    </Link>
                  </Flex>
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
