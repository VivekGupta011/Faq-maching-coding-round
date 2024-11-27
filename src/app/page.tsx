import Faq from "@/componnets/Faq";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
    <Faq />
  </div>
  );
}
