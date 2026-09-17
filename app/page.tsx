import Home from "@/features/home/Home";

export default function App() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full  flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Home />
      </main>
    </div>
  );
}
