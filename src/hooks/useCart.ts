import { useState } from 'react';
import { CartItem, CheckoutFormData } from '@/types/cart';

// Временные данные для тестирования корзины
const defaultCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Кольцо "Минимализм"',
    price: 15900,
    image: '/placeholder.svg',
    material: 'Серебро 925',
    size: '17',
    quantity: 1
  },
  {
    id: 2,
    name: 'Серьги "Геометрия"',
    price: 9800,
    image: '/placeholder.svg',
    material: 'Золото 585',
    quantity: 2
  }
];

const defaultFormData: CheckoutFormData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  deliveryMethod: 'courier',
  paymentMethod: 'card',
  agreeToTerms: false,
  subscribeToNewsletter: false
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(defaultCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [formData, setFormData] = useState<CheckoutFormData>(defaultFormData);

  // Рассчитываем общую стоимость
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = formData.deliveryMethod === 'pickup' ? 0 : 500;
  const total = subtotal + deliveryCost;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const applyPromoCode = () => {
    // Здесь будет логика применения промокода
    console.log('Applying promo code:', promoCode);
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа
    console.log('Order submitted:', { items, formData, total });
    // После успешной отправки можно перенаправить на страницу благодарности
  };

  return {
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
  };
};
