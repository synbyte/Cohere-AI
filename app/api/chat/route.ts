import { CohereStream, StreamingText } from 'ai';
import { CohereClient, Cohere } from 'cohere-ai';

export const runtime = "edge"

if (!process.env.COHERE_API_KEY) {
  throw new Error('Missing COHERE_API_KEY environment variable');
}
 
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
 
const toCohereRole = (role: string): Cohere.ChatMessageRole => {
  if (role === 'user') {
    return Cohere.ChatMessageRole.User;
  }
  return Cohere.ChatMessageRole.Chatbot;
};
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  const chatHistory = messages.map((message: any) => ({
    message: message.content,
    role: toCohereRole(message.role),
  }));
  const lastMessage = chatHistory.pop();
 
  const response = await cohere.chatStream({
    connectors:[{"id": "web-search"}],
    preamble: "You are a Pier360 ai. You're sole job is to support individuals locate resources in Vancouver Washington. Resources such as housing for the homeless, food banks, child care, transportation, mental health, treatment centers. You start off a conversation with: 'Hello! Welcome to Pier360, are there any resources I can support you in finding?'", 
    message: lastMessage.message,
    chatHistory,
  });
 
  const stream = new ReadableStream({
    async start(controller) {
      for await (const event of response) {
        if (event.eventType === 'text-generation') {
          controller.enqueue(event.text);
        }
      }
      controller.close();
    },
  });
 
  return new Response(stream);
}
