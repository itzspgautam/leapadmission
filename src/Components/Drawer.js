import React, { Children } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Avatar,
  Text,
  Box,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { Images } from "@/Constants";
import Link from "next/link";

const NavDrawer = ({ children, pages, path }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <span ref={btnRef} onClick={onOpen}>
        {children}
      </span>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        bg="red"
      >
        <DrawerOverlay backdropFilter="auto" backdropBlur="5px" />
        <DrawerContent>
          <DrawerCloseButton size={"sm"} />
          <DrawerHeader p="0" mt="-5">
            <Flex
              bg="teal.200"
              p="4"
              mt="5"
              gap="2"
              h="100"
              alignItems={"center"}
            >
              <Avatar src={Images.USER_DEFAULT.default.src} />
              <Box>
                <Text fontSize={16} fontWeight="semibold">
                  Suraj Prakash Gautam
                </Text>
                <Text fontSize={12} fontWeight="400">
                  spgautam.vfx@gmail.com
                </Text>
              </Box>
            </Flex>
            <Stack spacing={2} mt="5" px="2">
              {pages.map((page) => (
                <Link href={page.link} key={page._id} onClick={() => onClose()}>
                  <Flex
                    bg={path === page.link ? "teal.100" : "white"}
                    p="2"
                    borderRadius={"md"}
                    gap="4"
                    alignItems={"center"}
                  >
                    <Box p="1" bg="teal.400" color={"white"} borderRadius="md">
                      {page.icon}
                    </Box>
                    <Text
                      fontSize={14}
                      fontWeight="semibold"
                      color={"blackAlpha.800"}
                    >
                      {page.title}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </Stack>
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
