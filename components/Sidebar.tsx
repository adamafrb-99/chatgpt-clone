'use client';

import { useSession, signOut } from 'next-auth/react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';

type Props = {};

const Sidebar = (props: Props) => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
      )
  );

  return (
    <div className="p-2 flex flex-col h-[calc(100vh-3rem)] sm:h-screen">
      <div className="flex-1">
        <div>
          <NewChat />

          <div id="model-selection">
            <ModelSelection />
          </div>

          <div className={`flex flex-col space-y-2 my-2`}>
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <img
          id="profile-pic"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          src={session.user?.image!}
          alt="Profile Picture"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
};

export default Sidebar;
