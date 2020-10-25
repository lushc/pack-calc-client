import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Heading,
  Box,
  Icon,
  Grid,
} from "@chakra-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 item must be packed")
    .required(),
  packSizes: yup
    .string()
    .matches(/^[\d, ]+/, "Pack sizes must be a comma-separated list of numbers")
    .required(),
});

const PackSizeResults = ({ results }) => (
  <Box mt={10}>
    <Flex alignItems="center">
      <Icon name="check-circle" size="32px" color="green.500" mr={2} />
      <Heading size="md">You'll need...</Heading>
    </Flex>
    <Grid mt={2} templateColumns="repeat(5, 1fr)" gap={6}>
      {results.map(([key, value]) => (
        <Box key={key} p={5} shadow="md" borderWidth="1px">
          <Heading>{value}x</Heading>
          <Heading fontSize="xl">{key}</Heading>
        </Box>
      ))}
    </Grid>
  </Box>
);

export default function HookForm() {
  const [results, setResults] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleSubmit, reset, errors, register } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 1,
      packSizes: "250, 500, 1000, 2000, 5000",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({
          quantity: parseInt(values.quantity, 10),
          packSizes: values.packSizes
            .split(",")
            .map((item) => parseInt(item.trim(), 10)),
        }),
      });
      setResults(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <FormControl isInvalid={errors.quantity}>
          <FormLabel htmlFor="quantity">Quantity</FormLabel>
          <Input
            name="quantity"
            size="lg"
            variant="flushed"
            type="number"
            ref={register}
            fontSize={40}
            mr={4}
          />
          <FormErrorMessage>
            {errors.quantity && errors.quantity.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl w="100%" isInvalid={errors.packSizes}>
          <FormLabel htmlFor="packSizes">Pack sizes</FormLabel>
          <Input
            name="packSizes"
            size="lg"
            variant="flushed"
            type="text"
            ref={register}
          />
          <FormErrorMessage>
            {errors.packSizes && errors.packSizes.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt={4}>
        <Button
          isLoading={isLoading}
          loadingText="Calculating"
          size="lg"
          variantColor="gray"
          variant="solid"
          type="submit"
          borderRadius={0}
        >
          Calculate
        </Button>
        <Button
          onClick={() => {
            setResults(null);
            reset();
          }}
          isDisabled={isLoading}
          size="lg"
          variantColor="gray"
          variant="outline"
          borderRadius={0}
          ml={2}
        >
          Reset
        </Button>
      </Flex>
      {results && <PackSizeResults results={Object.entries(results)} />}
    </form>
  );
}
