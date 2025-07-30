import { fetcher } from "./fetcher";
import { ItemWithPrice } from "@/types/Items";

export async function getItems(): Promise<ItemWithPrice[]> {
  return await fetcher(`${process.env.API_URL}/items/prices`, "GET");
}
