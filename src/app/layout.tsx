// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import AppShellClient from "./AppShellClient";
import { getItemTypes } from "@/lib/api/itemTypes";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata = {
  title: "Ragnarok X Global Marketplace",
  description: "A simple project to track prices",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const itemTypes = await getItemTypes();
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <AppShellClient itemTypes={itemTypes}>{children}</AppShellClient>
        </MantineProvider>
      </body>
    </html>
  );
}
