import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, Text, useToast } from "@chakra-ui/react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useDispatch, useSelector } from "react-redux";

import { RecaptchaVerifier } from "firebase/auth";
import { FirebaseAuth } from "@/Config/FirebaseApp";
import UserActions from "@/State/Actions/UserActions";
import Colors from "@/Constants/Colors";
import AuthActions from "@/State/Actions/AuthActions";

const PhoneInputUi = () => {
  const [phone, setPhone] = useState("");
  const Dispatch = useDispatch();

  const { userLoading, userError } = useSelector((state) => state.User);
  const { auth, authLoading, authError } = useSelector((state) => state.User);

  useEffect(() => {
    const generateRecaptcha = async () => {
      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
        },
        FirebaseAuth
      );

      window.recaptchaVerifier = appVerifier;
    };

    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      generateRecaptcha();
    }
  }, []);

  const phoneNumberSubmitHandler = async () => {
    Dispatch(AuthActions.loginWithPhone(phone, window.recaptchaVerifier));
  };

  return (
    <>
      <Box
        p="2"
        display={"flex"}
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <Box>
          <Heading as={"h2"} size="md">
            Login for the best experience
          </Heading>

          <Text fontSize={"sm"} color="blackAlpha.700" mt="1" mb="3">
            Enter your phone number to continue.
          </Text>

          <Text
            fontSize={"13px"}
            color="red"
            fontWeight={"semibold"}
            mt="1"
            mb="3"
          >
            {userError}
          </Text>

          <PhoneInput
            disabled={userLoading}
            inputProps={{
              required: true,
              autoFocus: true,
            }}
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            containerStyle={{
              height: "45px",
              border: "2px solid #e6e7e8",
              borderRadius: "5px",
              overflow: "hidden",
            }}
            inputStyle={{ width: "100%", height: "100%", border: "none" }}
            dropdownStyle={{
              zIndex: "0",
              width: "100%",
              height: "100%",
              left: "0",
              bottom: "0%",
              position: "fixed",
              padding: "10px",
              borderRadius: "10px",
            }}
            buttonStyle={{
              border: "none",
              background: "transparent",
            }}
          />
        </Box>
        <Box>
          <Button
            onClick={() => {
              phoneNumberSubmitHandler();
            }}
            isLoading={userLoading}
            size={"md"}
            fontWeight={"medium"}
            bg={Colors.PRIMARY[500]}
            colorScheme="teal"
            loadingText="Loading"
            spinnerPlacement="start"
            borderRadius={"sm"}
            w="100%"
            mt="10"
            mb="5"
          >
            &nbsp;Continue
          </Button>
        </Box>
      </Box>
      <Box id="recaptcha-container" w="100%"></Box>
    </>
  );
};

export default PhoneInputUi;
