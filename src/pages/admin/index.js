import AdminRoute from "@/Components/Admin/AdminAuth";
import { Grid, GridItem, Box, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { FaUser, FaPhone, FaComments, FaStar } from "react-icons/fa";

const grids = [
  {
    title: "Users",
    description: "Manage all registered users",
    icon: FaUser,
    bg: "blue.500",
    slug: "users",
  },
  {
    title: "Callback",
    description: "View and manage callback requests",
    icon: FaPhone,
    bg: "purple.500",
    slug: "callback",
  },
  {
    title: "Contacts",
    description: "Manage contact form submissions",
    icon: FaComments,
    bg: "green.500",
    slug: "contacts",
  },
  {
    title: "Testimonials",
    description: "Approve or delete customer testimonials",
    icon: FaStar,
    bg: "yellow.500",
    slug: "testimonials",
  },
];

const GridCard = ({ title, description, icon, bg, slug }) => {
  const path = `/admin/${slug}`;
  return (
    <Link href={path}>
      <Box
        p={6}
        rounded="md"
        bg={bg}
        color="white"
        _hover={{ bg: "gray.700", cursor: "pointer" }}
      >
        <Icon as={icon} boxSize={8} mb={4} />
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <Text fontSize="sm">{description}</Text>
      </Box>
    </Link>
  );
};

const Dashboard = () => {
  return (
    <AdminRoute>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        p={6}
      >
        {grids.map((grid, index) => (
          <GridItem key={index}>
            <GridCard {...grid} />
          </GridItem>
        ))}
      </Grid>
    </AdminRoute>
  );
};

export default Dashboard;
