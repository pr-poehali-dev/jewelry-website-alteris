import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex gap-4 p-4 border rounded-md">
      <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </Link>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <Link to={`/product/${item.id}`} className="font-medium hover:underline">
            {item.name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onRemove(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mt-1">
          {item.material}
          {item.size && ` • Размер: ${item.size}`}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <QuantityControl 
            quantity={item.quantity} 
            onUpdate={(quantity) => onUpdateQuantity(item.id, quantity)} 
          />
          
          <div className="font-medium">
            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuantityControlProps {
  quantity: number;
  onUpdate: (quantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onUpdate }) => {
  return (
    <div className="flex items-center">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onUpdate(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <Input 
        type="number" 
        value={quantity} 
        onChange={(e) => onUpdate(parseInt(e.target.value) || 1)}
        className="mx-2 w-14 h-8 text-center"
        min={1}
      />
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onUpdate(quantity + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default CartItem;
