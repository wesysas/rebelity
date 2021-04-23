import { Variation } from "../../models/Pos";

export type VariationItemProps = {
  variation: Variation,
  curVariationId: number,
  picture: string,
  withOptions: boolean,
  onClickItem: (productId: number) => void;
};
