import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

const WebGLError = () => {
  return (
    <Alert
      status="error"
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
      <AlertIcon />
      <Box>
        <AlertTitle>WebGL2 is not available!</AlertTitle>
        <AlertDescription>
          <UnorderedList spacing={1}>
            <ListItem>Please use a browser that supports WebGL2.</ListItem>
            <ListItem>
              If hardware acceleration is disabled, please enable it.
            </ListItem>
            <ListItem>Read the Help for the browser.</ListItem>
          </UnorderedList>
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export default WebGLError;
