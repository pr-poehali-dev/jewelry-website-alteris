import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const EmptyCart: React.FC = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-light mb-4">Ваша корзина пуста</h2>
      <p className="text-muted-foreground mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
      <Button asChild size="lg" className="glow-button">
        <Link to="/catalog">Перейти в каталог</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
