import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemsProps {
  items: CartItemType[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartItems: React.FC<CartItemsProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onCheckout
}) => {
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onUpdateQuantity={onUpdateQuantity} 
            onRemove={onRemoveItem} 
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-8">
        <Button 
          variant="ghost" 
          className="text-muted-foreground"
          onClick={onClearCart}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Очистить корзину
        </Button>
        
        <Button onClick={onCheckout}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
