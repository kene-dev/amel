export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[]
    exp: string;
   
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice: number;
    category: string;
    images: string[];
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductResponse {
    products: Product[] | [];
    page: number;
    totalPages: number;
    nextPage: string | null;
  }


export interface AuthState {
    user: User | null;
    isAdmin: boolean;
    isAuthenticated: boolean;
    registeredUsers: User[];
}

export interface CartPayload extends Omit<Product, 'category' | 'createdAt' | 'updatedAt' | 'stock' | 'description' | 'discountedPrice'> {
    quantity: number;
}
export interface CartState {
    cartItems: CartPayload[];
    totalQuantity: number;
    subtotal: number;
    totalAmount: number;
}


export interface FilterType {
    _id: string
    name: string,
    productCount:number
}


export interface Customer {
    email: string;
    phone_number: string;
    name: string;
  }
  
  export interface Customizations {
    title: string;
    description: string;
    logo: string;
  }
  
  export interface PaymentConfig {
    public_key: string;
    tx_ref:  string;
    amount: number;
    currency: string;
    payment_options: string;
    customer: Customer;
    customizations: Customizations;
  }

  export interface Order {
    _id: string;
    customer: string;
    items: OrderItem[];
    cost: number;
    originalCost: number;
    status: "pending" | "shipped" | "delivered" | "cancelled"; // Add more statuses if needed
    delivery: DeliveryDetails;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
  }
  
  export interface DeliveryDetails {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    instructions?: string; // Optional field
    date: string;
  }