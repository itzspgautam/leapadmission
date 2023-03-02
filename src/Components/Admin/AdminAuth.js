import { Button, Center, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUserCog, FaUserShield } from "react-icons/fa";
import { useSelector } from "react-redux";
import LoginDrawer from "../Auth/LoginDrawer";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((State) => State.User);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  if (!user) {
    return (
      <Center h="100vh">
        <LoginDrawer loginToAccess={true}>
          <Spinner />
        </LoginDrawer>
      </Center>
    );
  }

  if (user.role !== "admin") {
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
