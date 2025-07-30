import { Text } from "@mantine/core";

export default function Navbar() {
  return (
    <Text>
      Navbar is collapsed on mobile at sm breakpoint. At that point it is no
      longer offset by padding in the main element and it takes the full width
      of the screen when opened.
    </Text>
  );
}
