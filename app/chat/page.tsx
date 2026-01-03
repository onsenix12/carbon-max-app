"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Leaf } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

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

[Go to Quest Hub →](/)`;
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
    <div className="min-h-screen bg-gradient-to-br from-muted via-primary/5 to-secondary/5 relative overflow-hidden flex flex-col">
      {/* Animated Background Particles */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 25, 0],
          y: [0, 25, -25, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          delay: 0.6,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header with glassmorphism */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-strong shadow-sm sticky top-0 z-10 relative"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm"
              >
                <Leaf className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <h1 className="font-display font-semibold text-foreground">Ask Max</h1>
                <p className="text-xs text-muted-foreground">Your sustainability guide</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.3,
                  delay: index === messages.length - 1 ? 0.1 : 0
                }}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                    message.role === "user"
                      ? "bg-[#10B981] text-white"
                      : "glass"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm whitespace-pre-wrap",
                      message.role === "user" ? "text-white" : "text-foreground"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br />"),
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="glass rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      <AnimatePresence>
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto px-4 pb-2"
          >
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((question, index) => (
                <motion.button
                  key={question}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1.5 glass rounded-full text-sm text-foreground hover:glass-strong transition-all shadow-sm hover:shadow-md"
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-strong border-t shadow-lg relative z-10"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Max anything..."
              className="flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-[#10B981] text-white rounded-full flex items-center justify-center hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

