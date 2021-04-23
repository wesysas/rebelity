import { Option } from "../../models/Pos";
import { Lineitem } from "../../pages/Pos/types";

export type LineitemRowProps = {
  lineitem: Lineitem,
  onClickIncrease: (productId: number, variantId: number) => void;
  onClickDecrease: (productId: number, variantId: number) => void;
  onClickOptionIncrease: (productId: number, variantId: number, optionId: number) => void;
  onClickOptionDecrease: (productId: number, variantId: number, optionId: number) => void;
};
