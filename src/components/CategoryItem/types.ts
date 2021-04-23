import { ProdCategory } from "../../pages/Pos/types";

export type CategoryItemProps = {
  category: ProdCategory
  onClickItem: (categoryId: number) => void;
};
