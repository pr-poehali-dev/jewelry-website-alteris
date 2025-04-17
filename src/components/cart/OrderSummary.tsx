import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
  onCheckout?: () => void;
  showCheckoutButton?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  subtotal, 
  deliveryCost, 
  total, 
  promoCode, 
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
  showCheckoutButton = false
}) => {
  return (
    <div className="border rounded-md p-6 sticky top-28">
      <h3 className="text-lg font-medium mb-4">Ваш заказ</h3>
      
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <div className="flex-1 pr-4">
              <p className="truncate">
                {item.name} <span className="text-muted-foreground">×{item.quantity}</span>
              </p>
            </div>
            <p className="font-medium">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <p>Подытог</p>
          <p>{subtotal.toLocaleString('ru-RU')} ₽</p>
        </div>
        
        <div className="flex justify-between">
          <p>Доставка</p>
          <p>{deliveryCost > 0 ? `${deliveryCost.toLocaleString('ru-RU')} ₽` : 'Бесплатно'}</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between text-lg font-medium">
        <p>Итого</p>
        <p>{total.toLocaleString('ru-RU')} ₽</p>
      </div>
      
      {/* Промокод */}
      <div className="mt-6">
        <p className="text-sm font-medium mb-2">Промокод</p>
        <div className="flex gap-2">
          <Input 
            placeholder="Введите промокод" 
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
          />
          <Button variant="outline" onClick={onApplyPromo}>Применить</Button>
        </div>
      </div>
      
      {/* Кнопка оформления в мобильной версии */}
      {showCheckoutButton && onCheckout && (
        <div className="mt-6 lg:hidden">
          <Button className="w-full" onClick={onCheckout}>
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
