'use client';

import { useChat } from 'ai/react';
import Markdown from 'react-markdown';
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  return (
    <div className="p-8 border-2 border-black h-screen bg-gradient-to-b from-neutral-100 to-neutral-300">
      <header className="text-center">
        <div className="text-2xl font-extrabold ...">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Larry
          </span>
        </div>
      </header>
      <div className="flex flex-col justify-between w-full max-w-md mx-auto h-full">
        <div id='messages' className="flex-grow overflow-y-auto max-h-96 my-4 rounded bg-neutral-100 border-t-2 border-b-2 border-b-gray-300">
          {messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap p-1">
              <span className="text-blue-500">{m.role === 'user' ? 'You: ' : 'AI: '}</span>
              <Markdown>{m.content}</Markdown>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded shadow-xl mx-auto"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}