import { getItemsWithPrice } from "@/lib/api/items";
import GenericTable from "@/app/components/tables.tsx/GenericTable";

export default async function Home() {
  const items = await getItemsWithPrice();

  return <GenericTable data={items} />;
}
