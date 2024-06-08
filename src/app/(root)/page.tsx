
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href="/kanban/create">
            Create a new board
          </Link>
        </Button>
    </section>
  );
}
