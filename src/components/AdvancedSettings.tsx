import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

function AvancedSettings() {
  return (
    <Stack spacing="24px">
      <Box>
        <FormLabel htmlFor="username">Name</FormLabel>
        <Input id="username" placeholder="Please enter user name" />
      </Box>

      <Box>
        <FormLabel htmlFor="url">Url</FormLabel>
        <InputGroup>
          <InputLeftAddon>http://</InputLeftAddon>
          <Input type="url" id="url" placeholder="Please enter domain" />
          <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
      </Box>

      <Box>
        <FormLabel htmlFor="owner">Select Owner</FormLabel>
        <Select id="owner" defaultValue="segun">
          <option value="segun">Segun Adebayo</option>
          <option value="kola">Kola Tioluwani</option>
        </Select>
      </Box>

      <Box>
        <FormLabel htmlFor="desc">Description</FormLabel>
        <Textarea id="desc" />
      </Box>
    </Stack>
  );
}

export default AvancedSettings;
