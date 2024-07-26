"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToProductPage = () => {
    router.push('/Products');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full items-center justify-center font-mono text-5xl lg:flex">
        hi there , Welcome !
      </div>
      <button 
        onClick={navigateToProductPage} 
        className="px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Going Products Page
      </button>
    </main>
  );
}