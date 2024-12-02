
import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";



const poppins = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 min-h-96">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold pl-10 text-center pb-10 pt-10 ${poppins.className}`}>
            The best URL shortener in the Market
          </p>
          <p className="px-56 text-center pb-4">
            We are the most straightfoward URL Shortener in the world. Most of the url shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener
          </p>
          <div className='flex gap-3 justify-start pb-10'>
          <Link href="/shorten"><button className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white'>Try Now</button></Link>
          <Link href="/github"><button className='bg-purple-500 rounded-lg shadow-lg p-3 py-1 font-bold text-white'>GitHub</button></Link>
        </div>
        </div>
        <div className=" flex justify-start relative">
          <Image className="mix-blend-darken" alt="an Image of a vector" src={"/vector.jpg"} fill={true}    />
        </div>

      </section>
    </main>
  );
}
