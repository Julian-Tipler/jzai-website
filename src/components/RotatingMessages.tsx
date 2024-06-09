import React, { useEffect, useState } from "react";
import { Message } from "./Message";

const conversations = [
  {
    user: "What time are you open on Saturdays?",
    assistant: "Hey! We are open today from 10am-6pm. Come on in!",
  },
  {
    user: "I have a complaint!",
    assistant:
      "I'm sorry to hear that. Here you can submit a formal complaint: https://yourwebsite.com/complaints",
  },
  {
    user: "I have a question about my order",
    assistant:
      "Sure! you can track your order here: https://yourwebsite.com/orders",
  },
];

export const RotatingMessages = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % conversations.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const conversation = conversations[selected];
  const randomNum = Math.floor(Math.random() * 1000);

  return (
    <div className="flex flex-col w-3/4 justify-center items-center gap-8">
      <>
        <Message
          key={randomNum}
          className="animate-slide-in invisible"
          message={{
            role: "user",
            content: conversation.user,
          }}
        />
        <Message
          key={randomNum + 1}
          className="animate-slide-in invisible"
          style={{ animationDelay: "1s" }}
          message={{
            role: "assistant",
            content: conversation.assistant,
          }}
        />
      </>
    </div>
  );
};
