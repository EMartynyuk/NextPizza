import { FormInput, FormTextarea, WhiteBlock } from "..";

interface ICheckoutAddress {
  className?: string;
}

export const CheckoutAddress = ({ className }: ICheckoutAddress) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Введите адрес"
        />
        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
