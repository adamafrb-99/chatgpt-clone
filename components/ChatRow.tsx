import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState<boolean>(false);

  const [messages] = useCollection(
    collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
  );

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link
      className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
      href={`/chat/${id}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 truncate">
        {messages?.docs[messages.docs.length - 1]?.data().text || 'New chat'}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
};

export default ChatRow;
