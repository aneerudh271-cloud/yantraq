import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import ChatBot from '@/components/chat/ChatBot';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
};
