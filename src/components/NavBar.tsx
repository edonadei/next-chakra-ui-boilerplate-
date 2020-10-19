import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{data, fetching}] = useMeQuery();
  let body = null
  if (fetching){
    // data is loading
  } else if (!data?.me) {
    // user is not logged in
    body = (
        <React.Fragment>
            <NextLink href="/login">
                <Link mr={2}>login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link>register</Link>
            </NextLink>
        </React.Fragment>
    )
  } else {
    body = (
        <Flex>
            <Box mr={2}>
                {data?.me?.username}
            </Box>
            <Button variant="link">logout</Button>
        </Flex>
    )
  }
  return (
    <Flex bg="tan" p={4} ml={"auto"}>
    <Box ml={"auto"}>
    {body}
    </Box>
    </Flex>
  );
};
