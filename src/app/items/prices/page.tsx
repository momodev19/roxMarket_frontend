import GenericTable from "@/app/components/tables.tsx/GenericTable";
import { getItemsWithPrice } from "@/lib/api/items";
import { ItemTypeId } from "@/types/Items";

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: ItemTypeId;
}) {
  const items = await getItemsWithPrice(searchParams.typeId);

  return <GenericTable data={items} />;
}
