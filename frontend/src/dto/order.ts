export interface PlaceOrder {
  shippingFee: number;
  products: Array<OrderProduct>;
  shippingInfo: ShippingInfo;
  customerId: string;
  email: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface OrderSeller {
  id: number;
  products: Array<OrderProduct>;
  price: number;
  sellerId?: number;
}

export interface OrderProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Orders {
  orders: Array<Order>;
}

export interface Order {
  id: number;
  customerId: number;
  products: Array<OrderProduct>;
  price: number;
  paymentStatus: string;
  shippingInfo: ShippingInfo;
  deliveryStatus: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
