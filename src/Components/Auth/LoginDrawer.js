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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiFillFacebook, AiFillGoogleSquare } from "react-icons/ai";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import UserActions from "@/State/Actions/UserActions";

const LoginDrawer = (props) => {
  const GoogleAuth = new GoogleAuthProvider();
  const FacebookAuth = new FacebookAuthProvider();

  const dispatch = useDispatch();

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
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter="auto" backdropBlur="5px" />
        <DrawerContent
          bg="transparent"
          w={["100vh", "80vw", "30vw"]}
          margin={"auto"}
        >
          <Center>
            <Box bg="white" p="3" borderRadius={"md"} zIndex={1} mb="-30px">
              <Image src={Images.LOGO_WIDE.default.src} h="6" alt="logo" />
            </Box>
          </Center>
          <Box bg="white" borderTopRadius={"xl"}>
            <DrawerBody mt="10" pb="200px" px="5">
              <Stack alignItems={"center"} spacing={4}>
                <Button
                  w="70%"
                  leftIcon={<AiFillGoogleSquare size={30} />}
                  colorScheme="red"
                  variant="solid"
                  justifyContent={"flex-start"}
                  borderRadius="sm"
                  onClick={() => socialLogin(GoogleAuth)}
                >
                  Continue with Google
                </Button>
                <Button
                  w="70%"
                  leftIcon={<AiFillFacebook size={30} />}
                  colorScheme="facebook"
                  justifyContent={"flex-start"}
                  borderRadius="sm"
                  onClick={() => socialLogin(FacebookAuth)}
                >
                  Continue with facebook
                </Button>
              </Stack>
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
