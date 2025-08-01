import GenericTable from "@/app/components/tables.tsx/GenericTable";
import { getItemsWithPrice } from "@/lib/api/items";
import { ItemTypeName } from "@/types/ItemTypes";
import { itemTypeNames } from "@/constants/itemTypes";

function getItemTypeIdByName(name: string): number | undefined {
  for (const [key, value] of Object.entries(itemTypeNames)) {
    if (value.toLocaleLowerCase() === name) {
      return Number(key);
    }
  }

  return undefined;
}

export default async function ItemsPage({
  params,
}: {
  params: Promise<{ type: ItemTypeName["name"] }>;
}) {
  const { type } = await params;
  const items = await getItemsWithPrice(getItemTypeIdByName(type));

  return <GenericTable data={items} />;
}
