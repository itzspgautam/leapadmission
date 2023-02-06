import { Images } from "@/Constants";
import UserActions from "@/State/Actions/UserActions";
import {
  Avatar,
  Button,
  Center,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome, AiOutlineInfo, AiOutlinePhone } from "react-icons/ai";
import { RiPhoneFill, RiSearch2Line } from "react-icons/ri";
import { TbAlignLeft } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import LoginDrawer from "./Auth/LoginDrawer";
import NavDrawer from "./Drawer";

const NavPages = [
  { _id: 1, title: "Home", link: "/", icon: <AiOutlineHome /> },
  { _id: 2, title: "About Us", link: "/about", icon: <AiOutlineInfo /> },
  { _id: 3, title: "Contacts", link: "/contacts", icon: <AiOutlinePhone /> },
];

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const logout = () => {
    dispatch(UserActions.logout());
  };
  return (
    <>
      <Center display={["none", "none", "flex"]} bg="teal.900" p="2" gap="2">
        <Text color={"white"}>Get scholorship worth</Text>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          color={"white"}
          _hover={{ color: "teal" }}
          size="sm"
        >
          Learn More
        </Button>
      </Center>

      <Center
        display={["none", "none", "flex"]}
        justifyContent={"space-between"}
        px="14"
        py="2"
        boxShadow={"sm"}
        borderBottom="1px solid"
        borderBottomColor={"gray.200"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .9)"
        backdropFilter={"blur(50px)"}
        gap="10"
        zIndex={2}
      >
        <Image src={Images.LOGO_WIDE} height="35" alt="LeapAdmission Logo" />
        <UnorderedList
          listStyleType={"none"}
          display="flex"
          gap="8"
          w="100%"
          justifyContent={"flex-end"}
        >
          {NavPages.map((page) => (
            <Link href={page.link} key={page._id}>
              <ListItem
                color={router.pathname === page.link ? "teal" : "teal.900"}
                fontWeight={router.pathname === page.link ? "semibold" : ""}
              >
                {page.title}
              </ListItem>
            </Link>
          ))}
        </UnorderedList>
        <Center justifyContent={"flex-end"} gap="8">
          <Center
            w="300px"
            bg="blue.50"
            justifyContent={"flex-start"}
            gap="3"
            p="1.5"
            borderRadius={"md"}
            px="2"
            h="10"
            cursor={"pointer"}
          >
            <Text color={"gray.400"}>
              <RiSearch2Line size={20} />
            </Text>
            <Text color={"gray.400"}>Search Something</Text>
          </Center>
          <Button colorScheme="teal" h="10">
            <RiPhoneFill size="20" />
          </Button>
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.displayName}
                  size={"md"}
                  src={user.photoURL}
                  alt="user"
                  borderWidth={"3px"}
                  borderColor="gray.300"
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem>Profile</MenuItem> */}
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <LoginDrawer>
              <Avatar
                name="Leap Admission User"
                size={"md"}
                src={Images.USER_DEFAULT.default.src}
                alt="user"
              />
            </LoginDrawer>
          )}
        </Center>
      </Center>

      <Center
        display={["flex", "flex", "none"]}
        justifyContent={"space-between"}
        px="4"
        py="3"
        boxShadow={"sm"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .5)"
        backdropFilter={"blur(50px)"}
        zIndex={2}
      >
        <NavDrawer pages={NavPages} path={router.pathname}>
          <TbAlignLeft size={25} />
        </NavDrawer>
        <Image src={Images.LOGO_WIDE} height="30" alt="logo" />

        <Center justifyContent={"flex-end"} gap="5">
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.displayName}
                  size={"md"}
                  src={user.photoURL}
                  alt="user"
                  borderWidth={"3px"}
                  borderColor="gray.300"
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem>Profile</MenuItem> */}
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <LoginDrawer>
              <Avatar
                name="Leap Admission User"
                size={"md"}
                src={Images.USER_DEFAULT.default.src}
                alt="user"
              />
            </LoginDrawer>
          )}
        </Center>
      </Center>
    </>
  );
};

export default Navbar;
