import '../styles/globals.css';
import Sidebar from '../components/Sidebar';
import SessionProvider from '../components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '../components/Login';
import ClientProvider from '../components/ClientProvider';
import Navbar from '../components/Navbar';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {session ? (
            // <div className="relative flex flex-col sm:flex-row">
            <div className="flex">
              {/* Navbar */}
              <div className="sm:hidden">
                <Navbar />
              </div>

              <div className="hidden sm:inline bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>

              {/* Client Provider - Notification */}
              <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          ) : (
            <Login />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
