import { Checkbox } from "../ui";

export interface IFilterCheckbox {
  text: string;
  value: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckbox = ({
  text,
  value,
  onCheckedChange,
  checked,
}: IFilterCheckbox) => {
  return (
    <label className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded-[8px] w-6 h-6"
      />
      <span className="leading-none cursor-pointer flex-1">{text}</span>
    </label>
  );
};
