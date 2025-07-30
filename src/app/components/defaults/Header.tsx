import { Burger, Group } from "@mantine/core";

type HeaderPropsType = {
  opened: boolean;
  toggle: () => void;
};

export default function Header({ opened, toggle }: HeaderPropsType) {
  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      Ragnarok X Global Marketplace
    </Group>
  );
}
