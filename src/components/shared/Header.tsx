import { cn } from "@/utils/utils";
import { Container, HeaderLogin, Logo, SearchInput } from ".";
import { CartButton } from "./CartButton";

interface IHeader {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header = ({
  hasSearch = true,
  hasCart = true,
  className,
}: IHeader) => {
  return (
    <header className={cn("border-b ", className)}>
      <Container className="flex items-center justify-between py-8">
        <Logo />

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <HeaderLogin />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
