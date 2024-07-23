export interface PlaceOrder {
  shippingFee: number;
  products: Array<OrderProduct>;
  shippingInfo: ShippingInfo;
  billingInfo: BillingInfo;
  customerId: string;
  email: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface OrderSeller {
  id: string;
  products: Array<OrderProduct>;
  price: number;
  sellerId?: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Orders {
  orders: Array<Order>;
}

export interface Order {
  id: string;
  customerId: string;
  products: Array<OrderProduct>;
  price: number;
  paymentStatus: string;
  shippingInfo: ShippingInfo;
  billingInfo: BillingInfo;
  deliveryStatus: string;
  date: string;
  createdAt: string | null;
  updatedAt: string | null;
}
