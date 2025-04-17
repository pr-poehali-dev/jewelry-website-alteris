import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Trash2, ArrowLeft, CreditCard, Truck, ShoppingBag } from 'lucide-react';

// Временные данные для тестирования корзины
const cartItems = [
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

const Cart: React.FC = () => {
  const [items, setItems] = useState(cartItems);
  const [activeTab, setActiveTab] = useState('cart');
  const [promoCode, setPromoCode] = useState('');
  const [formData, setFormData] = useState({
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
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа
    console.log('Order submitted:', { items, formData, total });
    // После успешной отправки можно перенаправить на страницу благодарности
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl mb-8">Корзина</h1>
      
      {items.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-md">
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
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.material}
                          {item.size && ` • Размер: ${item.size}`}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input 
                              type="number" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="mx-2 w-14 h-8 text-center"
                              min={1}
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          
                          <div className="font-medium">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-8">
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground"
                    onClick={() => setItems([])}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Очистить корзину
                  </Button>
                  
                  <Button onClick={() => setActiveTab('checkout')}>
                    Оформить заказ
                  </Button>
                </div>
              </TabsContent>
              
              {/* Оформление заказа */}
              <TabsContent value="checkout" className="mt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    {/* Контактная информация */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Контактная информация</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="fullName">ФИО</Label>
                          <Input 
                            id="fullName" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Выбор доставки */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Способ доставки</h3>
                      <RadioGroup 
                        value={formData.deliveryMethod} 
                        onValueChange={(value) => handleSelectChange('deliveryMethod', value)}
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <RadioGroupItem value="courier" id="delivery-courier" />
                          <div>
                            <Label htmlFor="delivery-courier" className="font-medium flex items-center mb-1">
                              <Truck className="h-4 w-4 mr-2" />
                              Курьером
                            </Label>
                            <p className="text-sm text-muted-foreground">Доставка за 1-3 дня (500 ₽)</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem value="pickup" id="delivery-pickup" />
                          <div>
                            <Label htmlFor="delivery-pickup" className="font-medium flex items-center mb-1">
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Самовывоз
                            </Label>
                            <p className="text-sm text-muted-foreground">Из магазина Alteris (бесплатно)</p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Адрес доставки (показывать только при выборе курьера) */}
                    {formData.deliveryMethod === 'courier' && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Адрес доставки</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="address">Адрес</Label>
                            <Input 
                              id="address" 
                              name="address" 
                              value={formData.address} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">Город</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              value={formData.city} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Индекс</Label>
                            <Input 
                              id="postalCode" 
                              name="postalCode" 
                              value={formData.postalCode} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Оплата */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Способ оплаты</h3>
                      <RadioGroup 
                        value={formData.paymentMethod} 
                        onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label htmlFor="payment-card" className="font-medium flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Банковская карта
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cash" id="payment-cash" />
                          <Label htmlFor="payment-cash" className="font-medium">
                            Наличными при получении
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {/* Дополнительно */}
                    <div>
                      <div className="flex items-start space-x-3 mb-3">
                        <Checkbox 
                          id="subscribeToNewsletter" 
                          name="subscribeToNewsletter" 
                          checked={formData.subscribeToNewsletter} 
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, subscribeToNewsletter: checked as boolean }))
                          }
                        />
                        <div>
                          <Label htmlFor="subscribeToNewsletter" className="font-medium mb-1">
                            Подписаться на рассылку
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Получайте новости о новых коллекциях и акциях
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="agreeToTerms" 
                          name="agreeToTerms" 
                          checked={formData.agreeToTerms} 
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                          }
                          required
                        />
                        <div>
                          <Label htmlFor="agreeToTerms" className="font-medium mb-1">
                            Согласен с условиями
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Я прочитал и согласен с <Link to="/terms" className="underline">условиями использования</Link> и <Link to="/privacy" className="underline">политикой конфиденциальности</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab('cart')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Вернуться к корзине
                      </Button>
                      
                      <Button type="submit" disabled={!formData.agreeToTerms} className="glow-button">
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Сводка заказа */}
          <div>
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
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Применить</Button>
                </div>
              </div>
              
              {/* Кнопка в мобильной версии */}
              {activeTab === 'cart' && (
                <div className="mt-6 lg:hidden">
                  <Button className="w-full" onClick={() => setActiveTab('checkout')}>
                    Оформить заказ
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
