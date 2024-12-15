import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

export async function getGroqResponse(message: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are an academic expert, you always cite your sources and base your response on only the context that you have been provided",
    },
    { role: "user", content: message },
  ];

  console.log("starting groq request");

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });

  console.log("Received groq api request", response);

  return response.choices[0].message.content;
}
