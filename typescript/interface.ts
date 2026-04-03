interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  quantity: number;
}

// Optionale Properties mit ?
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional – muss nicht da sein
  loyaltyPoints?: number; // Optional
}

// Verschachtelte Interfaces
interface Order {
  id: number;
  customer: Customer;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  subtotal: number;
}
