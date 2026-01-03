"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Leaf } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = `Hi! I'm Max, your sustainability guide. 🌿

I can help you:
• Find the best quests for you
• Explain carbon facts
• Suggest green merchants nearby

What would you like to know?`;

const QUICK_QUESTIONS = [
  "Which quest should I do first?",
  "How does SAF work?",
  "Find me a green restaurant",
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("quest") || lower.includes("first") || lower.includes("start")) {
    return `Great question! Based on your journey, I recommend starting with **"Green Your Flight"** in Departure mode! 🛫

It's worth **150 base points**, and if you contribute SAF, you can earn up to **350 points total**.

Plus, you'll learn about Sustainable Aviation Fuel - Singapore is mandating 1% SAF from 2026!

[Go to Quest Hub →](/carbonmax)`;
  }

  if (lower.includes("saf") || lower.includes("sustainable aviation") || lower.includes("fuel")) {
    return `**SAF (Sustainable Aviation Fuel)** is amazing! Here's what you need to know: ✈️🌿

• Made from **waste oils, agricultural residue**, or even captured CO2
• Reduces lifecycle emissions by **up to 80%**
• Works in existing aircraft - no modifications needed
• Singapore will require **1% SAF from 2026**

When you contribute to SAF through CarbonMax, you're helping airlines accelerate the transition. Your contribution is verified through the **Book-and-Claim** system.

Want to make a SAF contribution now?`;
  }

  if (lower.includes("restaurant") || lower.includes("food") || lower.includes("eat") || lower.includes("dining")) {
    return `For green dining, I have some great recommendations! 🥗

**Top Picks (Carbon A+ rated):**

1. **Cedele** - Jewel, #01-234
   Healthy café with amazing plant-based options
   
2. **Pho Street** - Terminal 3, #02-156
   Vietnamese with delicious veggie pho
   
3. **The Soup Spoon** - Jewel, #B2-045
   Sustainable soups and salads

💡 **Tip:** Ordering plant-based earns you **+40 bonus points** on the Green Plate quest!

Would you like directions to any of these?`;
  }

  if (lower.includes("point") || lower.includes("tier") || lower.includes("reward")) {
    return `Let me explain the **Green Tier** system! 🌱

**How to earn Eco-Points:**
• Complete quests (30-350 pts each)
• Bonus points for sustainable choices
• Higher tiers = point multipliers

**Tier Levels:**
🌱 Seedling: 0-499 pts
🌿 Sprout: 500-1,499 pts (10% bonus)
🌳 Tree: 1,500-3,999 pts (15% bonus)
🌲 Forest: 4,000-9,999 pts (20% bonus)
🏔️ Canopy: 10,000+ pts (25% bonus)

Each tier unlocks exclusive perks like lounge access and merchant deals!`;
  }

  if (lower.includes("plastic") || lower.includes("bottle") || lower.includes("water") || lower.includes("refill")) {
    return `Great eco-thinking! 💧

Changi has **50+ free water refill stations** across all terminals. Each refill saves:
• 12g of plastic
• 100g of CO2 from production

Try the **Hydration Station** quest in Transit mode to earn **30-50 points**!

The stations near boarding gates give you bonus points. 🎁`;
  }

  // Default response
  return `That's a great question! 🤔

For now, I'd suggest exploring the quests in your current mode. Each one teaches you something new about sustainable travel.

**Quick suggestions:**
• 🟡 **Jewel mode**: Try the Green Plate Discovery
• 🔵 **Departure mode**: Green Your Flight with SAF
• 🩵 **Transit mode**: Quick Hydration Station quest

Is there something specific about sustainability or carbon reduction you'd like to know?`;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add assistant response
    const response = getResponse(messageText);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/carbonmax" className="text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-eco-leaf rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Ask Max</h1>
                <p className="text-xs text-gray-500">Your sustainability guide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-eco-leaf text-white"
                    : "bg-white border border-gray-200"
                )}
              >
                <p
                  className={cn(
                    "text-sm whitespace-pre-wrap",
                    message.role === "user" ? "text-white" : "text-gray-700"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="max-w-md mx-auto px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Max anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-eco-leaf focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-eco-leaf text-white rounded-full flex items-center justify-center hover:bg-eco-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

