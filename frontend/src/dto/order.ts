export interface PlaceOrderI {
  shippingFee: number;
  products: Array<OrderProductI>;
  shippingInfo: ShippingInfoI;
  customerId: number;
  email: string;
}

export interface ShippingInfoI {
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

export interface OrderSellerI {
  id: number;
  products: Array<OrderProductI>;
  price: number;
  sellerId?: number;
}

export interface OrderProductI {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface OrdersI {
  orders: Array<OrderI>;
}

export interface OrderI {
  id: number;
  customerId: number;
  products: Array<OrderProductI>;
  price: number;
  paymentStatus: string;
  shippingInfo: ShippingInfoI;
  deliveryStatus: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
