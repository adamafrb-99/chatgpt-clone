'use client';

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';

type Props = {
  chatId: string;
}

const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session && query(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages',
      ),
      orderBy('createdAt', 'asc')
    )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <div className="mt-10 text-white">
          <p className="text-center">
            Type a prompt in below to get started!
          </p>
          <ArrowDownCircleIcon className="h-8 w-8 mt-3 mx-auto animate-bounce" />
        </div>
      )}
      
      {messages?.docs.map(message => (
        <Message key={message.id} message={message.data()} />
      ))}
    </div>
  )
}

export default Chat;