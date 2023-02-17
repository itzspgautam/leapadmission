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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Images } from "@/Constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import LoginDrawer from "./Auth/LoginDrawer";

const ChildrenListMobile = ({ page, onClose }) => {
  const router = useRouter();

  return (
    <Accordion allowMultiple p="0">
      {page.hasChildren ? (
        <>
          <AccordionItem border="none" p="0" m="0">
            <AccordionButton p="0" m="0" display={"block"}>
              <Flex
                bg={router.pathname === page.link ? "teal.100" : "white"}
                p="2"
                borderRadius={"md"}
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Flex gap="4">
                  <Box p="1.5" bg="teal.400" color={"white"} borderRadius="md">
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
                <AccordionIcon />
              </Flex>
            </AccordionButton>

            <AccordionPanel pb={4}>
              {page?.children?.map((page) => (
                <ChildrenListMobile
                  page={page}
                  key={page._id}
                  onClose={onClose}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        </>
      ) : (
        <Link
          href={page.link}
          key={page._id}
          onClick={() => onClose()}
          bg="red"
        >
          <Flex
            bg={router.pathname === page.link ? "teal.100" : "white"}
            p="2"
            borderRadius={"md"}
            gap="4"
            alignItems={"center"}
          >
            <Box p="1" bg="teal.400" color={"white"} borderRadius="md">
              {page.icon}
            </Box>
            <Text fontSize={14} fontWeight="semibold" color={"blackAlpha.800"}>
              {page.title}
            </Text>
          </Flex>
        </Link>
      )}
    </Accordion>
  );
};

const NavDrawer = ({ children, pages, path }) => {
  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.User);

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
            {user ? (
              <Flex
                bg="teal.200"
                p="4"
                mt="5"
                gap="2"
                h="100"
                alignItems={"center"}
              >
                <Avatar src={user?.photoURL} />
                <Box>
                  <Text fontSize={16} fontWeight="semibold">
                    {user?.displayName}
                  </Text>
                  <Text fontSize={12} fontWeight="400">
                    {user?.email}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <LoginDrawer>
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
                      Login/Signup
                    </Text>
                    <Text fontSize={12} fontWeight="400">
                      Login for the best experience.
                    </Text>
                  </Box>
                </Flex>
              </LoginDrawer>
            )}
            <Stack spacing={2} mt="5" px="2">
              {pages.map((page) => (
                <ChildrenListMobile
                  page={page}
                  key={page._id}
                  onClose={onClose}
                />
              ))}
            </Stack>
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
