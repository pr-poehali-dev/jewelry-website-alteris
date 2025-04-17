import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, ShoppingBag, Truck } from 'lucide-react';
import { CheckoutFormData } from '@/types/cart';

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReturn: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  formData, 
  onInputChange, 
  onSelectChange,
  onCheckboxChange,
  onSubmit,
  onReturn
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-8">
        {/* Контактная информация */}
        <ContactInformation 
          formData={formData} 
          onInputChange={onInputChange} 
        />
        
        {/* Выбор доставки */}
        <DeliveryMethod 
          deliveryMethod={formData.deliveryMethod} 
          onSelectChange={(value) => onSelectChange('deliveryMethod', value)} 
        />
        
        {/* Адрес доставки (показывать только при выборе курьера) */}
        {formData.deliveryMethod === 'courier' && (
          <DeliveryAddress 
            formData={formData} 
            onInputChange={onInputChange} 
          />
        )}
        
        {/* Оплата */}
        <PaymentMethod 
          paymentMethod={formData.paymentMethod} 
          onSelectChange={(value) => onSelectChange('paymentMethod', value)} 
        />
        
        {/* Дополнительно */}
        <AdditionalOptions 
          subscribeToNewsletter={formData.subscribeToNewsletter}
          agreeToTerms={formData.agreeToTerms}
          onCheckboxChange={onCheckboxChange}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onReturn}
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
  );
};

interface ContactInformationProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Контактная информация</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="fullName">ФИО</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={formData.fullName} 
            onChange={onInputChange} 
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
            onChange={onInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={onInputChange} 
            required 
          />
        </div>
      </div>
    </div>
  );
};

interface DeliveryMethodProps {
  deliveryMethod: string;
  onSelectChange: (value: string) => void;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod, onSelectChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Способ доставки</h3>
      <RadioGroup 
        value={deliveryMethod} 
        onValueChange={onSelectChange}
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
  );
};

interface DeliveryAddressProps {
  formData: CheckoutFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ formData, onInputChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Адрес доставки</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address">Адрес</Label>
          <Input 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={onInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="city">Город</Label>
          <Input 
            id="city" 
            name="city" 
            value={formData.city} 
            onChange={onInputChange} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="postalCode">Индекс</Label>
          <Input 
            id="postalCode" 
            name="postalCode" 
            value={formData.postalCode} 
            onChange={onInputChange} 
            required 
          />
        </div>
      </div>
    </div>
  );
};

interface PaymentMethodProps {
  paymentMethod: string;
  onSelectChange: (value: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, onSelectChange }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Способ оплаты</h3>
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={onSelectChange}
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
  );
};

interface AdditionalOptionsProps {
  subscribeToNewsletter: boolean;
  agreeToTerms: boolean;
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({ 
  subscribeToNewsletter, 
  agreeToTerms, 
  onCheckboxChange 
}) => {
  return (
    <div>
      <div className="flex items-start space-x-3 mb-3">
        <Checkbox 
          id="subscribeToNewsletter"
          checked={subscribeToNewsletter} 
          onCheckedChange={(checked) => 
            onCheckboxChange('subscribeToNewsletter', checked as boolean)
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
          checked={agreeToTerms} 
          onCheckedChange={(checked) => 
            onCheckboxChange('agreeToTerms', checked as boolean)
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
  );
};

export default CheckoutForm;
