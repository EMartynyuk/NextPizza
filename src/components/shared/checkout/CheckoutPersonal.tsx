import { FormInput, WhiteBlock } from "..";

interface ICheckoutPersonal {
  className?: string;
}

export const CheckoutPersonal = ({ className }: ICheckoutPersonal) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="Email" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
