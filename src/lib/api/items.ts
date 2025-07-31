import { fetcher } from "./fetcher";
import { ItemWithPrice } from "@/types/Items";

export async function getItemsWithPrice(
  typeId?: number
): Promise<ItemWithPrice[]> {
  const url = new URL(`${process.env.API_URL}/items/prices`);

  if (typeId) {
    url.searchParams.set("typeId", typeId.toString());
  }

  return await fetcher(url.toString(), "GET");
}
