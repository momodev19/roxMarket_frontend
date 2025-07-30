export type Item = {
  id: number;
  name: string;
  typeId: number;
};

export type ItemWithPrice = Item & {
  price: number;
};
