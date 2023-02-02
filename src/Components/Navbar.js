import { Images } from "@/Constants";
import {
  Button,
  Center,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiPhoneFill, RiSearch2Line } from "react-icons/ri";
import { TbAlignLeft } from "react-icons/tb";
import NavDrawer from "./Drawer";

const NavPages = [
  { _id: 1, title: "Home", link: "/" },
  { _id: 2, title: "About Us", link: "/about" },
  { _id: 3, title: "Contacts", link: "/contacts" },
  // { _id: 1, title: "Community", link: "/home" },
];

const Navbar = () => {
  return (
    <>
      <Center display={["none", "none", "flex"]} bg="teal.900" p="2" gap="2">
        <Text color={"white"}>This is the strip bar for desktop</Text>
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
        px="10"
        py="2"
        boxShadow={"sm"}
        borderBottom="1px solid"
        borderBottomColor={"gray.200"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .5)"
        backdropFilter={"blur(50px)"}
        gap="10"
        zIndex={2}
      >
        <Image src={Images.LOGO_WIDE} height="35" />
        <UnorderedList
          listStyleType={"none"}
          display="flex"
          gap="8"
          w="100%"
          justifyContent={"flex-end"}
        >
          {NavPages.map((page) => (
            <Link href={page.link} key={page._id}>
              <ListItem color={"blue.800"}>{page.title}</ListItem>
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
          <Image
            style={{ borderRadius: "50%" }}
            src={Images.USER_DEFAULT}
            height="50"
            width="50"
          />
        </Center>
      </Center>

      <Center
        display={["flex", "flex", "none"]}
        justifyContent={"space-between"}
        px="2"
        py="2"
        boxShadow={"sm"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .5)"
        backdropFilter={"blur(50px)"}
        zIndex={2}
      >
        <NavDrawer>
          <TbAlignLeft size={25} />
        </NavDrawer>
        <Image src={Images.LOGO_WIDE} height="30" />

        <Center justifyContent={"flex-end"} gap="5">
          <Image
            style={{ borderRadius: "50%" }}
            src={Images.USER_DEFAULT}
            height="40"
            width="40"
          />
        </Center>
      </Center>
    </>
  );
};

export default Navbar;
