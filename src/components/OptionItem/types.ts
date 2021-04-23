import { Option } from "../../models/Pos";
import { LineitemOption } from "../../pages/Pos/types";

export type OptionItemProps = {
  option: Option,
  curLineitemOptions: LineitemOption[],
  onClickItem: (optionId: number) => void;
};
