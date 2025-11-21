"use client"
import { useRouter } from 'next/navigation';



export default function Home() {

    const router = useRouter();

    const notesPageClick = () => {
        router.push('/notes');
    }

    const restosPageClick = () => {
        router.push('/restos');
    }

    const datesPageClick = () => {
        router.push('/dates');
    }

    return(
    <div className="flex min-h-screen items-center justify-center font-mono-roboto font-bold bg-amber-50">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 gap-5">
                <h1 className="text-4xl text-zinc-500"> Hi Christian </h1>
                <div className="flex flex-row items-center gap-10">
                    <button
                    onClick={notesPageClick}
                    className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        NOTES
                        </button>

                    <button
                        onClick={restosPageClick}
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        RESTOS
                        </button>


                    <button
                        onClick={datesPageClick}
                        className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-2 rounded-full font-bold">
                        DATES
                    </button>
                </div>
      </main>
    </div>
  );
}