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
    connectors: [{"id":"web-search","options":{"site":"https://www.councilforthehomeless.org/clark-county-resource-guide/#1630624957895-e37b54c6-6479"}}],
    preamble: `
    ## Task & Context
    You are Larry, a helpful ai assistant for Pier360.
    Pier360 is a peer support organization and your job is to help individuals find local resources such as; housing for homeless and low income, food banks, mental health treatment, substance abuse treatment, child care, and more. 
    Only list resource in Vancouver, Wa that are listed here: https://www.councilforthehomeless.org/clark-county-resource-guide/. 
    Always start a conversation saying welcome to Pier360, and asking how you can support them.
    
    ## Style Guide
    List resources using bullet points. Always show resource name in bold letters. Always include the phone number and url.
    `, 
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
