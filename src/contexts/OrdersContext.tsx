import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Order {
  movieId: string;
  showTime: string;
  seats: string[];
  name: string;
  email: string;
  cost: number;
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const addOrder = (order: Order) => setOrders((prev) => [...prev, order]);
  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
};
