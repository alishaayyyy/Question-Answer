import React from "react";

const messages = [
  { id: 1, sender: "Ali", text: "Hello, I need help with my order." },
  { id: 2, sender: "Sara", text: "Can you update my delivery status?" },
  { id: 3, sender: "Ahmed", text: "Thanks for the quick response!" },
];

export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {messages.map((m) => (
        <div key={m.id} className="border p-2 mb-2 rounded bg-white">
          <h3 className="font-semibold">{m.sender}</h3>
          <p>{m.text}</p>
        </div>
      ))}
    </div>
  );
}
