export type ItemTypeId = {
  typeId: number;
};

export type Item = ItemTypeId & {
  id: number;
  name: string;
};

export type ItemWithPrice = Item & {
  price: number;
};
