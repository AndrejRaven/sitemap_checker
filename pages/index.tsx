import Link from 'next/link';



export default function Main() {

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome</h1>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">This is a tool to check if your sitemap is working properly.</h2>
        <Link href="/home" className="mx-auto">Check here</Link>
      </div>
    </div>
  );
}