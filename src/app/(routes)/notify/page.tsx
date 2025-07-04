"use client";

import React from "react";

const Page = () => {
  const sendWhatsApp = async () => {
    const res = await fetch("/api/whatsapp/send", {
      method: "POST",
      body: JSON.stringify({
        to: "+918329801170", // Your sandbox-joined WhatsApp number
        message: "🎉 DealHunt: Your target price has been hit!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.success) {
      console.log("WhatsApp message sent:", data.sid);
    } else {
      console.error("Error sending WhatsApp message:", data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Send WhatsApp Notification</h1>
      <button
        onClick={sendWhatsApp}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Send WhatsApp Message
      </button>
    </div>
  );
};

export default Page;
