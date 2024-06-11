import Card from "../components/Card";
import { Contact } from "../components/Contact";

export const CustomerSupport = () => {
  return (
    <div>
      <Card className="flex w-full justify-between !p-12 gap-4">
        <div className="flex flex-col w-2/5">
          <h2 className="text-2xl font-normal mb-2">Customer Support</h2>
          <p className="text-gray-500 font-light">
            We are here to help you get started with AI integration. Our team of
            engineers is ready to answer your questions and help you get
            started.
          </p>
        </div>
        <div className="w-1/2">
          <Contact />
        </div>
      </Card>
    </div>
  );
};
