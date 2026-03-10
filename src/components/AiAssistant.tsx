"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { aiPoweredHelpTool } from "@/ai/flows/ai-powered-help-tool";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "bot";
  content: string;
};

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your InSync helper. I'm here to answer any technology questions you have, no matter how small. How can I make your technology work better for you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await aiPoweredHelpTool({ question: userMessage });
      setMessages((prev) => [...prev, { role: "bot", content: result.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "I'm sorry, I'm having a little trouble connecting. Please try again in a moment, or give us a call!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <Card className="w-[350px] sm:w-[450px] shadow-2xl border-primary/20 flex flex-col h-[600px] overflow-hidden rounded-[2rem]">
          <CardHeader className="bg-primary text-primary-foreground p-6 flex flex-row items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl font-headline">Friendly Tech Help</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col bg-background overflow-hidden">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                    <div className={cn("p-2 rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm", m.role === "user" ? "bg-accent text-white" : "bg-primary text-white")}>
                      {m.role === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                    </div>
                    <div className={cn("p-4 rounded-[1.5rem] text-lg max-w-[85%] leading-relaxed", m.role === "user" ? "bg-accent/10 rounded-tr-none text-foreground" : "bg-muted rounded-tl-none text-foreground")}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="p-2 rounded-xl h-10 w-10 flex items-center justify-center bg-primary text-white shrink-0">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="p-4 rounded-[1.5rem] text-lg bg-muted rounded-tl-none flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Just a moment...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-6 border-t bg-muted/20 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <Input
                  placeholder="Ask any question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="bg-background h-14 text-lg px-6 rounded-xl border-2 border-primary/10 focus:border-primary/40"
                />
                <Button type="submit" size="icon" className="h-14 w-14 rounded-xl shadow-lg" disabled={isLoading || !input.trim()}>
                  <Send className="w-6 h-6" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          size="lg"
          className="rounded-full w-20 h-20 shadow-2xl hover:scale-105 transition-all bg-primary"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="w-10 h-10" />
        </Button>
      )}
    </div>
  );
}
