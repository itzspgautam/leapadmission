import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";

import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "@/State/Actions/UserActions";
import Colors from "@/Constants/Colors";
import AuthActions from "@/State/Actions/AuthActions";

const OtpInput = () => {
  const dispatch = useDispatch();

  const [inputOtp1, setInputOtp1] = useState("");
  const [inputOtp2, setInputOtp2] = useState("");
  const [inputOtp3, setInputOtp3] = useState("");
  const [inputOtp4, setInputOtp4] = useState("");
  const [inputOtp5, setInputOtp5] = useState("");
  const [inputOtp6, setInputOtp6] = useState("");

  const fullOtp =
    inputOtp1 + inputOtp2 + inputOtp3 + inputOtp4 + inputOtp5 + inputOtp6;

  const { userLoading, phoneAuth, userError } = useSelector(
    (state) => state.User
  );

  const { verificationId, authError, authLoading } = useSelector(
    (state) => state.Auth
  );

  const otpSubmitHandler = () => {
    dispatch(AuthActions.verifyPhone(verificationId, fullOtp));
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
            Verify Phone Number
          </Heading>

          <Text fontSize={"sm"} color="blackAlpha.700" mt="1" mb="3">
            Please enter verification code we{"'"}ve sent you on
            <b> {phoneAuth?.phone}</b>
          </Text>
          <Center>
            <PinInput otp size={"md"}>
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp1(e.target.value)}
                _focus={{ borderColor: Colors.PRIMARY[500] }}
              />
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp2(e.target.value)}
                _focus={{ borderColor: Colors.PRIMARY[500] }}
              />
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp3(e.target.value)}
                _focus={{ borderColor: Colors.PRIMARY[500] }}
              />
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp4(e.target.value)}
                _focus={{ borderColor: Colors.PRIMARY[500] }}
              />
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp5(e.target.value)}
                _focus={{ borderColor: Colors.PRIMARY[500] }}
              />
              <PinInputField
                mx={0.5}
                onChange={(e) => setInputOtp6(e.target.value)}
              />
            </PinInput>
          </Center>
          <Center>
            <Text fontSize="12px" mt="5" align={"center"}>
              Didn{"'"}t received OTP? <b>Resend OTP</b>
            </Text>
          </Center>
        </Box>
        <Box mt="10" mb="5" display={"flex"} gap="5">
          {/* <Button
            size={"md"}
            colorScheme="red"
            loadingText="Loading"
            spinnerPlacement="start"
            borderRadius={"sm"}
            w="100%"
            variant={"outline"}
          >
            &nbsp;Back
          </Button> */}
          <Button
            onClick={() => otpSubmitHandler()}
            isLoading={userLoading}
            size={"md"}
            bg={Colors.PRIMARY[500]}
            fontWeight={"medium"}
            colorScheme="teal"
            loadingText="Verifying"
            spinnerPlacement="start"
            borderRadius={"sm"}
            w="100%"
          >
            &nbsp;Verify
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OtpInput;
