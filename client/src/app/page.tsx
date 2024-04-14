import Image from "next/image";

// Components
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-dashboard bg-no-repeat bg-center bg-cover bg-fixed relative">
      <div className="absolute inset-0 bg-white bg-opacity-20" />
      <Dashboard className="" />
      {/* <div className="h-[40px]"></div> */}
    </main>
  );
}
