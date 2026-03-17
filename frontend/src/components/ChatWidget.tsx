import React, { useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot, Sparkles } from "lucide-react";

type ChatMessage = { id: number; from: "user" | "bot"; text: string };

const cannedReplies: { test: RegExp; reply: string }[] = [
  { test: /delivery|time|arrive/i, reply: "Most orders arrive in ~30 minutes, depending on rush and your address." },
  { test: /vegan|veg/i, reply: "We have multiple vegetarian options (paneer tikka, veg biryani, veg burger, salads)." },
  { test: /spicy|hot/i, reply: "Tell us in checkout notes if you want milder spice; we’ll tone it down." },
  { test: /refund|payment/i, reply: "Payments are secured. If something goes wrong, reply here and we’ll sort it out." },
  { test: /recommend|suggest/i, reply: "Customer faves: Butter Chicken, Chicken Biryani, Pepperoni Pizza, Chocolate Cake." },
];

function getBotReply(text: string): string {
  const match = cannedReplies.find(({ test }) => test.test(text));
  return match
    ? match.reply
    : "Got it! A teammate will follow up soon. Meanwhile, try our Butter Chicken or Margherita Pizza—they’re best-sellers today.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "bot", text: "Hi! Need help picking a dish or tracking an order?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), from: "user", text: input.trim() };
    const botMsg: ChatMessage = {
      id: Date.now() + 1,
      from: "bot",
      text: getBotReply(input),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  };

  const suggestions = useMemo(
    () => ["Show best-sellers", "Any spicy items?", "Do you have veg options?", "How fast is delivery?"],
    []
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          <MessageCircle size={18} />
          Chat with us
        </button>
      )}

      {open && (
        <div className="w-80 overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-2xl dark:border-orange-500/40 dark:bg-slate-900">
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot size={16} />
              Tastevia Chat
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/20">
              <X size={16} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex max-h-80 flex-col gap-3 overflow-y-auto bg-gradient-to-b from-orange-50/60 to-white px-4 py-3 text-sm dark:from-slate-900 dark:to-slate-950"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm ${
                    m.from === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-3 pb-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s);
                  setTimeout(handleSend, 0);
                }}
                className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 transition hover:bg-orange-100 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-border/70 bg-white px-3 py-3 dark:bg-slate-900">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about menu, delivery..."
              className="flex-1 rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-sm focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:bg-slate-800"
            />
            <button
              onClick={handleSend}
              className="flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-2 text-white shadow-sm transition hover:shadow"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
