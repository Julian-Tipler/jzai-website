import { FaBookOpen, FaCompass, FaExclamationCircle } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { CopilotForm } from "../components/CopilotForm";
import PlanPanel from "../components/PlanPanel";
import { useQuery } from "@tanstack/react-query";
import supabase from "../clients/supabase";
import Plan from "../types/plan";
import Section, { SectionVariant } from "../components/Section";

export const Home = () => {
  const { data } = useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      await supabase.functions.invoke("plans", {
        method: "GET",
      }),
  });

  const plans = data?.data?.plans ? (data.data.plans as Plan[]) : [];

  const features = [
    {
      title: "Stay ahead of the competition",
      description:
        "Provide the AI driven experience an increasing number of users expect",
      icon: FaCompass,
    },
    {
      title: "Hands off assistance",
      description: "Reduce time spent answering user questions by up to 50%",
      icon: FaExclamationCircle,
    },
    {
      title: "Just one line",
      description:
        "Tour Guide's copilot displays on your website with just one line of html",
      icon: FaBookOpen,
    },
    {
      title: "Updates with your website",
      description:
        "Tour Guide consistently updates its map as you make changes to your website",
      icon: FaBookOpen,
    },
  ];

  return (
    <>
      <Section id="home" variant={SectionVariant.Secondary}>
        <div className="gap-24 py-8 px-4 mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 lg:py-36 lg:px-6">
          <div className="flex flex-col justify-center items-center md:items-start font-light sm:text-lg">
            <h1 className="mb-4 text-6xl font-medium text-gray-900 dark:text-white leading-tight">
              Your website needs a tour guide
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              “Tour Guide” answers questions and helps navigate your website,
              giving them a modern, AI-driven experience
            </p>
            <a
              href="#build"
              className="flex flex-row items-center w-fit gap-2 mt-14 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Build your copilot
              <FaArrowDownLong />
            </a>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="h-[400px] rounded-lg bg-cover"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content"
            />
          </div>
        </div>
      </Section>
      <Section id="features">
        <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-36 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              Bring your website into the future with <b>one line of code</b>
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400 font-light">
              Lorem ipsum
            </p>
          </div>
          <hr className="my-16" />
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <feature.icon
                    size={"24"}
                    className="color-colors-primary-blue"
                  />
                </div>
                <h3 className="mb-2 text-xl font-normal dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section
        id="build"
        variant={SectionVariant.Secondary}
        className="min-h-[838px]"
      >
        <CopilotForm />
      </Section>
      <Section id="pricing">
        <div className="py-8 px-4 lg:py-36 lg:px-6 flex flex-col items-center">
          <h2 className="text-5xl font-normal text-center mb-4">Pricing</h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400 font-light mb-20">
            Only pay for what you use...
          </p>
          {plans && (
            <div className="items-center justify-center gap-6 flex flex-wrap">
              {plans.map((plan) => (
                <PlanPanel key={plan.name} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </Section>
      <Section id="custom" variant={SectionVariant.Secondary}>
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-36 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 lg:order-last">
            <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
              Need a custom solution?
            </h2>
            <p className="mb-4 font-light">
              We work with you to build a custom AI solution that fits your
              exact business needs. We will set you up with the tools you need
              to get started and provide ongoing support.
            </p>
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
      </Section>
      <Section id="contact">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-normal leading-tight text-gray-900 dark:text-white">
              Talk to an engineer today
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              We are here to help you get started with AI integration. Our team
              of engineers is ready to answer your questions and help you get
              started.
            </p>
            <a
              href="#"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Find out more
            </a>
          </div>
        </div>
      </Section>
    </>
  );
};
