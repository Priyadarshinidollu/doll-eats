export type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  landmark: string;
  paymentMethod: "cod" | "upi" | "card";
};
