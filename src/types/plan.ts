type Plan = {
  name: string;
  code: string;
  successUrl: string;
  priceId: string | null;
  price: string;
  renewal: string;
  features: { feature: string; available: boolean }[];
};

export default Plan;
