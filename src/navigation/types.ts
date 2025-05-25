export type RootStackParamList = {
  Home: undefined;
  Details: { movieId: string };
  Checkout: { movieId: string; showTime: string };
  MyOrders: undefined;
};
