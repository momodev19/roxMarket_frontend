import { getItems } from "@/lib/api/items";
import GenericTable from "@/app/components/tables.tsx/GenericTable";

export default async function Home() {
  const items = await getItems();
  console.log(items);
  const tableOptions = {
    highlightOnHover: true,
    striped: true,
    withTableBorder: true,
  };
  return <GenericTable data={items} tableOptions={tableOptions} />;
}
