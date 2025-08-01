"use client";

import { ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./components/defaults/Header";
import Navbar from "./components/defaults/Navbar";
import { ItemType } from "@/types/ItemTypes";

export default function AppShellClient({
  children,
  itemTypes,
}: {
  children: ReactNode;
  itemTypes: ItemType[];
}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar itemTypes={itemTypes} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
