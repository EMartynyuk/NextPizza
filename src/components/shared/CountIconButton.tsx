import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/utils/utils';
import { CountButtonProps } from './CountButton';

interface IconButtonProps {
  size?: CountButtonProps['size'];
  disabled?: boolean;
  type?: 'plus' | 'minus';
  onClick?: () => void;
  loading?: boolean;
}

export const CountIconButton: React.FC<IconButtonProps> = ({
  size = 'sm',
  disabled,
  type,
  onClick,
  loading,
}) => {
  return (
    <Button
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      type="button"
      loading={loading}
      className={cn(
        'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400',
        size === 'sm' ? 'w-[30px] h-[30px] rounded-[10px]' : 'w-[38px] h-[38px] rounded-md',
      )}>
      {type === 'plus' ? (
        <Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
      ) : (
        <Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
      )}
    </Button>
  );
};
