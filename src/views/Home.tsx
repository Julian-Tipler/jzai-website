import { FaBookOpen, FaCompass, FaExclamationCircle } from "react-icons/fa";
import { CopilotForm } from "../components/CopilotForm";

export const Home = () => {
  return (
    <>
      {/* Splash */}
      <CopilotForm />
      {/* Unleash the potential */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mb-8 max-w-screen-md lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              Unleash the potential of AI this quarter with AZ-AI
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              AI will bring a number of advantages to your business
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <FaCompass size={"24"} className="color-colors-primary-blue" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Navigation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our helpful chatbot will become a personal guide for your
                customers.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <FaExclamationCircle size={"24"} color="" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Customer Complaints
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Analyze customer complaints with machine learning and identify
                pain points.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <FaBookOpen size={"24"} />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                Public Information
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Use AI to search through your public data and documents to grab
                exactly the information your customer needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* We make AI integration easy */}
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
              We make AI integration easy
            </h2>
            <p className="mb-4">
              Use our suite of pre-built AI tools to get started quickly.
            </p>
            <p>
              Our tools are designed to be easy to use and integrate with your
              existing website. Just insert one line of code and our chatbot
              appears instantly.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="chatbot on website"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
      {/* Custom Solutions */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 lg:order-last">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Need a custom solution?
            </h2>
            <p className="mb-4 font-light">
              We work with you to build a custom AI solution that fits your
              exact business needs. We will set you up with the tools you need
              to get started and provide ongoing support.
            </p>
            <p className="mb-4 font-medium">Work with a real person.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 lg:order-first">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="a real person talking to you"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="more collaborative pictures"
            />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Talk to an engineer today
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              We are here to help you get started with AI integration. Our team of engineers
              is ready to answer your questions and help you get started.
            </p>
            <a
              href="#"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Find out more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
