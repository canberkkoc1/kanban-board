
import { Button } from "@/components/ui/button";
import { getAllBoards } from "@/lib/actions/board.actions";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {

  const allBoards =await  getAllBoards()
  
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="lg" asChild className="button w-full sm:w-fit bg-white text-black hover:text-white hover:bg-gray-600">
        <Link href="/kanban/create">
          Create a new board
        </Link>
      </Button>
      <article className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto text-center"> 
        <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto text-center">
          <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">All Boards</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          { 
          allBoards.length > 0 ? 
            (
              allBoards.map((board,index) => (
                <Card key={index} className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto text-center">
                  <Link href={`/kanban/${board._id}`}>
                  <CardHeader>
                    <CardTitle>
                      {board.title}
                    </CardTitle>
                    <CardDescription className="overflow-hidden max-w-40 break-words whitespace-normal">
                      {board.description}
                    </CardDescription>
                  </CardHeader>
                      </Link>
                </Card>
              ))
            )
          :
          (
            <div
              className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto text-center col-span-3"
            >
              <p>No boards found</p>
            </div>
          )

          }
        </div>
      </article>
    </section>
  );
}
