'use client';
import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';
import { useChat } from 'ai/react';
import Markdown from 'react-markdown';
import { Dialog } from '@headlessui/react';

export default function Chat() {
  
  const [isOpen, setIsOpen] = useState(true);
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  
  //Auto scroll the chat window when text is added
  useEffect(() => {
    const chatContainer: any = document.getElementById('messages');
    chatContainer.scrollTop = chatContainer?.scrollHeight;
  }, [messages]);
  
  return (
    <div className="p-8 border-2 border-black h-full bg-gradient-to-b from-neutral-100 to-neutral-300">
      <header className="text-center">
        <div className="text-xl font-extrabold ...">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            PeerAssist
          </span>
          <button onClick={() => setIsOpen(true)}>click</button>
          
        </div>
      </header>
      <Dialog id='dialog' open={isOpen} onClose={() => setIsOpen(false)}>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4 '>
      <Dialog.Panel className="w-full max-w-sm rounded-xl bg-neutral-200 p-5 shadow-2xl">
        <Dialog.Title>Welcome to PeerAssist</Dialog.Title>
        <Dialog.Description>
          
        </Dialog.Description>

        <p>
          This AI is still in development. Please let me know of any bugs or inconsistencies that may come up.</p>
          <br/><p>Start by typing what you're looking for; <i>"I need housing resources", "What services do you have for veterans?", "I need a hot meal".</i> Or just simply say hi!</p>

        <button className='rounded-lg shadow-md bg-neutral-300 p-2' onClick={() => setIsOpen(false)}>Close</button>
        
      </Dialog.Panel>
      </div>
    </Dialog>
      <div className="flex flex-col justify-between w-full max-w-md mx-auto h-full">
        <div id='messages' className="flex-grow overflow-y-scroll max-h-96 my-4 rounded bg-neutral-100 border-t-2 border-b-2 border-b-gray-300">
          {messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap p-1">
              {m.role === 'user' ? <span className="text-fuchsia-600">You: </span> : <span className="text-blue-700">AI: </span>}
              <Markdown>{m.content}</Markdown>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded shadow-xl mx-auto"
            value={input}
            placeholder="What can I help you find?"
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}