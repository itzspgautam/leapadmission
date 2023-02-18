import { Images } from "@/Constants";
import {
  Box,
  Button,
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
import React from "react";
import { AiFillFacebook, AiFillGoogleSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "@/State/Actions/UserActions";
import PhoneInputUi from "./PhoneInputUi";
import OtpInput from "./OtpInput";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const LoginDrawer = (props) => {
  const dispatch = useDispatch();

  const GoogleAuth = new GoogleAuthProvider();
  const FacebookAuth = new FacebookAuthProvider();

  const { phoneAuth } = useSelector((state) => state.User);

  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const socialLogin = async (provider) => {
    dispatch(UserActions.socialLogin(provider));
  };

  return (
    <>
      <span ref={btnRef} onClick={onOpen}>
        {props.children}
      </span>
      <Drawer
        isOpen={props.loginToAccess ? onOpen : isOpen}
        placement={"bottom"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter="auto" backdropBlur="5px" />
        <DrawerContent
          bg="transparent"
          w={["100vh", "80vw", "30vw"]}
          margin={"auto"}
          pb={[0, 20]}
        >
          <Center>
            <Box bg="white" p="3" borderRadius={"md"} zIndex={1} mb="-30px">
              <Image src={Images.LOGO_WIDE.default.src} h="6" alt="logo" />
            </Box>
          </Center>
          <Box bg="white" borderTopRadius={"xl"} borderBottomRadius={[0, "xl"]}>
            <DrawerBody mt="10" pb="10" px="5">
              {phoneAuth?.status === "sent" ? (
                <OtpInput />
              ) : (
                <>
                  <PhoneInputUi />
                  <Stack alignItems={"center"} spacing={4}>
                    <Text my="3">OR</Text>
                    <Button
                      w="100%"
                      leftIcon={<AiFillGoogleSquare size={30} />}
                      colorScheme="red"
                      variant="solid"
                      justifyContent={"flex-start"}
                      borderRadius="sm"
                      onClick={() => socialLogin(GoogleAuth)}
                      fontSize={[14, 16]}
                    >
                      Continue with Google
                    </Button>
                    <Button
                      w="100%"
                      leftIcon={<AiFillFacebook size={30} />}
                      colorScheme="facebook"
                      justifyContent={"flex-start"}
                      borderRadius="sm"
                      onClick={() => socialLogin(FacebookAuth)}
                      fontSize={[14, 16]}
                    >
                      Continue with facebook
                    </Button>
                  </Stack>
                </>
              )}
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
