import { Grid, GridItem, Skeleton } from "@chakra-ui/react";

const SquareGridSkeleton = () => {
  // Create an array of length 10
  const items = Array(4).fill(null);

  return (
    <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} ml={5}>
      {items.map((_, index) => (
        <GridItem key={index}>
          <Skeleton height="150px" width="150px" />
        </GridItem>
      ))}
    </Grid>
  );
};

export default SquareGridSkeleton;