type Plan = {
  id: string;
  name: string;
  code: string;
  pricePerMessage: number;
  features: {
    available: boolean;
    feature: string;
  }[];
};

export default Plan;
