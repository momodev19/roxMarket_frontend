import { NavLink } from "@mantine/core";
import Link from "next/link";
import { ItemType } from "@/types/ItemTypes";
import { slugify } from "@/lib/api/utils/slug";

interface NavbarProps {
  itemTypes: ItemType[];
}

export default function Navbar({ itemTypes }: NavbarProps) {
  return (
    <>
      <NavLink component={Link} href="/" label="Dashboard" />
      <NavLink href="#" label="Items" childrenOffset={28} defaultOpened>
        {itemTypes.map((itemType) => (
          <NavLink
            key={itemType.id}
            component={Link}
            href={`/items/${slugify(itemType.name.toLowerCase())}`}
            label={itemType.name}
          />
        ))}
      </NavLink>
      <NavLink href="#" label="Progression" />
    </>
  );
}
