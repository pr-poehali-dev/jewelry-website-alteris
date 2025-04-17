export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  material: string;
  size?: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'courier' | 'pickup';
  paymentMethod: 'card' | 'cash';
  agreeToTerms: boolean;
  subscribeToNewsletter: boolean;
}
