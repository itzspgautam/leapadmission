import { Images } from "@/Constants";
import {
  Box,
  Button,
  Card,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiFillFacebook, AiFillGoogleSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "@/State/Actions/UserActions";
import PhoneInputUi from "./PhoneInputUi";
import OtpInput from "./OtpInput";

import { useToast } from "@chakra-ui/react";

import Colors from "@/Constants/Colors";
import AuthActions from "@/State/Actions/AuthActions";
const { FirebaseAuth } = require("@/Config/FirebaseApp");

const LoginDrawer = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { phoneAuth } = useSelector((state) => state.User);
  const { logAuth, auth, authLoading, authError, verificationId } = useSelector(
    (state) => state.Auth
  );

  const socialLogin = async () => {
    dispatch(AuthActions.loginWithGoogle());
  };

  useEffect(() => {
    authError &&
      toast({
        title: "Error",
        description: authError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "top-accent",
      });
  }, [authError]);

  return (
    <Center pt={[5, 10, 20, 30]} pb={"100vh"} px={2} bg={Colors.LIGHT[300]}>
      <Card w={["100vw", "80vw", "50vw", "30vw"]}>
        <Box bg="white" borderTopRadius={"xl"} borderBottomRadius={[0, "xl"]}>
          {!auth && (
            <Box mt="10" pb="10" px="5">
              <>
                {!logAuth?.phoneNumber &&
                  (verificationId ? <OtpInput /> : <PhoneInputUi />)}

                {!verificationId && !logAuth?.email && (
                  <Button
                    w="100%"
                    leftIcon={<AiFillGoogleSquare size={30} />}
                    colorScheme="red"
                    variant="solid"
                    justifyContent={"center"}
                    borderRadius="sm"
                    onClick={() => socialLogin()}
                    fontSize={[12, 14]}
                  >
                    Continue with Google
                  </Button>
                )}
              </>
            </Box>
          )}
        </Box>
      </Card>
    </Center>
  );
};

export default LoginDrawer;
