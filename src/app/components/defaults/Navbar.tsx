import { NavLink } from "@mantine/core";
import Link from "next/link";
import { ItemType } from "@/types/ItemTypes";

export default function Navbar({ itemTypes }: { itemTypes: ItemType[] }) {
  return (
    <>
      <NavLink component={Link} href="/" label="Dashboard" />
      <NavLink href="#" label="Items" childrenOffset={28} defaultOpened>
        {itemTypes.map((itemType) => (
          <NavLink
            key={itemType.id}
            component={Link}
            href={`/items/${itemType.name.toLocaleLowerCase()}`}
            label={itemType.name}
          />
        ))}
      </NavLink>
      <NavLink href="#" label="Progression" />
    </>
  );
}
