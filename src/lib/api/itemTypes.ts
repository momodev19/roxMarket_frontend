import { fetcher } from "./fetcher";
import { ItemType } from "@/types/ItemTypes";

export async function getItemTypes(): Promise<ItemType[]> {
  return await fetcher(`${process.env.API_URL}/items/types`);
}
