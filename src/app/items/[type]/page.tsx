import GenericTable from "@/app/components/tables/GenericTable";
import { getItemsWithPrice } from "@/lib/api/items";
import { ItemTypeName } from "@/types/ItemTypes";
import { ITEM_TYPE_NAMES } from "@/constants/itemTypes";
import { deslugify } from "@/lib/utils/slug";

function getItemTypeIdByName(name: string): number | undefined {
  for (const [key, value] of Object.entries(ITEM_TYPE_NAMES)) {
    if (value.toLowerCase() === deslugify(name)) {
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
