import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import {useRouter} from 'next/router'
import { withUrqlClient } from "next-urql";
import { CreateUrqlClient } from "../utils/createUrlqlClient";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await register(values);
          if (response.data?.register.errors){
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user){
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) =>
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(CreateUrqlClient)(Register);
