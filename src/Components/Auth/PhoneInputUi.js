import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, Text, useToast } from "@chakra-ui/react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useDispatch, useSelector } from "react-redux";

import { RecaptchaVerifier } from "firebase/auth";
import { FirebaseAuth } from "@/Config/FirebaseApp";
import UserActions from "@/State/Actions/UserActions";

const PhoneInputUi = () => {
  const [phone, setPhone] = useState("");
  const Dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.User);
  const toast = useToast();
  useEffect(() => {
    if (!error) {
      return;
    }
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    Dispatch(clearErrors());
  }, [error, Dispatch, toast]);

  useEffect(() => {
    generateRecaptcha();
  }, []);

  const appVerifier = window.recaptchaVerifier;
  const generateRecaptcha = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      FirebaseAuth
    );
  };

  const phoneNumberSubmitHandler = async () => {
    Dispatch(UserActions.sendOtp(appVerifier, phone));
  };

  return (
    <>
      <Box id="recaptcha-container" w="100%"></Box>
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

          <PhoneInput
            disabled={loading ? true : false}
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
          <Center>
            <Text fontSize="10px" mt="5" align={"center"}>
              By continuning, you agree to our <b>Term & Condition</b> &
              <b> Privacy Policy</b>.
            </Text>
          </Center>
        </Box>
        <Box>
          <Button
            onClick={() => {
              phoneNumberSubmitHandler();
            }}
            isLoading={loading ? true : false}
            size={"md"}
            colorScheme="yellow"
            loadingText="Loading"
            spinnerPlacement="start"
            borderRadius={"sm"}
            w="100%"
            mt="10"
            mb="5"
          >
            &nbsp;Request OTP
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PhoneInputUi;
