import Link from "next/link";
import { Button } from "./_components/ui/button";
import { metadata } from "./layout";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl flex-1">
      <div className="flex flex-1 flex-col space-y-4 px-8 py-6">
        <div className="py-8 sm:py-24">
          <h1
            className={
              "text-center text-4xl leading-snug tracking-wide sm:text-6xl"
            }
          >
            <div>
              <span className="font-semibold text-primary-600">
                {metadata.title as string}
              </span>{" "}
              is a microapp for
            </div>
            <div>quadratic voting</div>
          </h1>

          <p className="py-4 text-center text-xl sm:py-16 sm:text-2xl">
            Create a poll, share the link, and vote with your friends.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              className="w-full sm:w-48"
              as="a"
              href={"/dashboard/new"}
              size="lg"
              variant="primary"
            >
              Create Poll
            </Button>
            <Button
              className="w-full sm:w-48"
              size="lg"
              as={Link}
              href={"https://en.wikipedia.org/wiki/Quadratic_voting"}
              target="_blank"
            >
              How does it work?
            </Button>
          </div>
        </div>

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/poll/clsrkyfzi0000s9u40r0z10oe`}
            width={"100%"}
            height={500}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
