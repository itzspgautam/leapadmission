import { AppConfig } from "@/Config/AppConfig";
import UserActions from "@/State/Actions/UserActions";
import { getToken } from "@/Utils/AuthStorage";
import { Button, Center, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUserCog, FaUserShield } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LoginDrawer from "../Auth/LoginDrawer";

const AdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((State) => State.User);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isAdmin = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const { data } = await axios.post(
        `${AppConfig.API_ENDPOINT}/auth/admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      dispatch(UserActions.logout());

      console.log(error);
    }
  };
  useEffect(() => {
    isAdmin();
  }, []);

  if (!user) {
    return (
      <Center h="100vh">
        <LoginDrawer loginToAccess={true}>
          <Spinner />
        </LoginDrawer>
      </Center>
    );
  }

  if (user.role === "user") {
    return (
      <Center h="100vh" flexDir={"column"} color="red.500">
        <FaUserShield size="50" />
        <Text>You are not authorised to access this resource </Text>
        <Link href={"/"}>
          <Button size="sm" mt="4" colorScheme={"green"} borderRadius="sm">
            Go to home
          </Button>
        </Link>
      </Center>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
