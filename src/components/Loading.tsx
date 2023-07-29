import { Box, Spinner, VStack } from "@chakra-ui/react";

type LoadingProps = {
  loading: boolean;
  message: string;
};
const Loading = ({ loading, message }: LoadingProps) => {
  if (!loading) {
    return;
  }
  return (
    <VStack
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "70%",
        borderRadius: 10,
        transform: "translate(-50%, -50%)",
        WebkitTransform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
      }}
    >
      <Box color="#eee" fontSize="1.5em">
        {message}
      </Box>
      <Spinner color="#eee" size="xl" thickness="4px" speed="0.5s" />
    </VStack>
  );
};

export default Loading;
