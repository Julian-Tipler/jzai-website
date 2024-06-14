import { useEffect, useState } from "react";
import { MessageBubble } from "../../components/MessageBubble";

const conversations = [
  {
    user: "What time are you open on Saturdays?",
    assistant: "We are open today from 10am-6pm. Come on in!",
  },
  {
    user: "I have a complaint! 😡",
    assistant:
      "I'm sorry to hear that. Here you can submit a formal complaint: https://yourwebsite.com/complaints",
  },
  {
    user: "When is my order getting here?",
    assistant: "You can track your order here: https://yourwebsite.com/orders",
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
    <div className="flex flex-col w-full items-center gap-8">
      <MessageBubble
        key={randomNum}
        className="animate-slide-in invisible"
        message={{
          role: "user",
          content: conversation.user,
        }}
      />
      <MessageBubble
        key={randomNum + 1}
        className="animate-slide-in invisible"
        style={{ animationDelay: "1s" }}
        message={{
          role: "assistant",
          content: conversation.assistant,
        }}
      />
    </div>
  );
};
