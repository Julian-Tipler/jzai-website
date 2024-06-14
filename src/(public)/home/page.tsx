import { FaLaptopCode, FaMapMarkedAlt, FaRobot } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { BuildCopilotSection } from "./build-copilot-section";
import PlanCard from "../../components/plan-card";
import { FaArrowDownLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../clients/supabase";
import Section, { SectionVariant } from "../../components/section";
import { useRef, useState } from "react";
import { Contact } from "../../components/contact-form";
import { RotatingMessages } from "./rotating-messages";
import WiseLink from "../../components/wise-link";
import { SUPPORT_EMAIL } from "../../helpers/constants";

export const Home = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      await supabase
        .from("plans")
        .select("*")
        .order("pricePerMessage", { ascending: true }),
  });

  const plans = data?.data ? data.data : [];

  const [url, setUrl] = useState("");

  const features = [
    {
      title: "Stay ahead of the competition",
      description: "Provide the AI driven experience users expect",
      icon: FaRobot,
    },
    {
      title: "Hands off assistance",
      description: "Save up to 50% on customer service costs",
      icon: FaMoneyBill1Wave,
    },
    {
      title: "One line of HTML",
      description: "Just copy and paste!",
      icon: FaLaptopCode,
    },
    {
      title: "Updates with your website",
      description: "WisePilot frequently updates its map of your website",
      icon: FaMapMarkedAlt,
    },
  ];

  const tryNowLinkRef = useRef<HTMLAnchorElement | null>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tryNowLinkRef.current) {
        tryNowLinkRef.current.click();
      }
    }
  };

  return (
    <>
      <Section id="home" variant={SectionVariant.Secondary}>
        <div className="gap-40 py-8 px-4 mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 lg:py-36 lg:px-6 justify-items-center">
          <div className="flex flex-col justify-center items-center md:items-start font-light sm:text-lg">
            <h1 className="mb-4 text-6xl font-medium text-gray-900 dark:text-white leading-tight">
              Your website needs a copilot
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              WisePilot is an AI chatbot that helps users navigate your website.
            </p>
            <div className="flex gap-1 h-fit mt-10">
              <div className="flex flex-col">
                <input
                  id="name"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Your website URL"
                  className="w-52 md:w-80 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  onKeyDown={handleKeyPress}
                />
              </div>
              <WiseLink
                id="try-it-now"
                ref={tryNowLinkRef}
                to="#build"
                className="flex flex-row items-center w-fit gap-2 whitespace-nowrap"
              >
                Try it now
                <FaArrowDownLong />
              </WiseLink>
            </div>
            <p className="text-center text-gray-600 text-sm font-light">
              No Login Required
            </p>
          </div>
          <RotatingMessages />
        </div>
      </Section>
      <Section id="features">
        <div className="py-24 px-4 mx-auto max-w-screen-xl lg:py-36 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white leading-tight">
              It only takes <b>one line of code</b>
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400 font-light">
              Adding an AI assistant has never been easier
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
        <BuildCopilotSection webUrl={url} />
      </Section>
      {plans && (
        <Section id="pricing">
          <div className="py-8 px-4 lg:py-36 lg:px-6 flex flex-col items-center">
            <h2 className="text-5xl font-normal text-center mb-4">Pricing</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400 font-light mb-20">
              Only pay for what you use.
            </p>
            <div className="items-center justify-center gap-6 flex flex-wrap">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </Section>
      )}
      <Section id="custom" variant={SectionVariant.Secondary}>
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-36 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 lg:order-last">
            <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
              Need a custom solution?
            </h2>
            <p className="mb-4 font-light">
              We will work with you to build a custom AI solution that fits your
              exact business needs. We can set you up with the tools you need to
              get started and provide ongoing support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 lg:order-first">
            <img
              className="w-full rounded-lg"
              src="https://gvewqhwcmnmdeyckkvlo.supabase.co/storage/v1/object/public/photos/priscilla-du-preez-nNMBa7Y1Ymk-unsplash.jpg"
              alt=""
            />
            <img
              className="mt-4 w-full h-full rounded-lg lg:mt-10"
              src="https://gvewqhwcmnmdeyckkvlo.supabase.co/storage/v1/object/public/photos/olena-bohovyk-dIMJWLx1YbE-unsplash.jpg"
              alt=""
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
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              We&apos;re here to help you get started with AI integration. Our
              team of engineers is ready to answer your questions and help you
              get started.
            </p>
            <p className="mb-10 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Use the form below to send us a message or email us at{" "}
              <a className="text-brand" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
            <Contact />
          </div>
        </div>
      </Section>
    </>
  );
};
