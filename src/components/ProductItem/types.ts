import { Product } from "../../models/Pos";

export type ProductItemProps = {
  product: Product,
  curProdId: number,
  asVariant: boolean,
  onClickItem: (productId: number) => void;
};
