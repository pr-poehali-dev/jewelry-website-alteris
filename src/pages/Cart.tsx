import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, CreditCard } from 'lucide-react';

import EmptyCart from '@/components/cart/EmptyCart';
import CartItems from '@/components/cart/CartItems';
import OrderSummary from '@/components/cart/OrderSummary';
import CheckoutForm from '@/components/cart/CheckoutForm';
import { useCart } from '@/hooks/useCart';

const Cart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cart');
  const { 
    items,
    promoCode,
    setPromoCode,
    formData,
    subtotal,
    deliveryCost,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    applyPromoCode,
    submitOrder
  } = useCart();

  // Обработчики для переключения между корзиной и оформлением
  const handleCheckout = () => {
    setActiveTab('checkout');
  };

  const handleReturnToCart = () => {
    setActiveTab('cart');
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl mb-8">Корзина</h1>
      
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент (корзина и оформление) */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="cart">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Корзина
                </TabsTrigger>
                <TabsTrigger value="checkout" disabled={items.length === 0}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Оформление
                </TabsTrigger>
              </TabsList>
              
              {/* Корзина */}
              <TabsContent value="cart" className="mt-6">
                <CartItems 
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onClearCart={clearCart}
                  onCheckout={handleCheckout}
                />
              </TabsContent>
              
              {/* Оформление заказа */}
              <TabsContent value="checkout" className="mt-6">
                <CheckoutForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  onCheckboxChange={handleCheckboxChange}
                  onSubmit={submitOrder}
                  onReturn={handleReturnToCart}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Сводка заказа */}
          <div>
            <OrderSummary 
              items={items}
              subtotal={subtotal}
              deliveryCost={deliveryCost}
              total={total}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={applyPromoCode}
              onCheckout={handleCheckout}
              showCheckoutButton={activeTab === 'cart'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
