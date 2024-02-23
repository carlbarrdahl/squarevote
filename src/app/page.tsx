import Link from "next/link";
import { Button } from "./_components/ui/button";
import { metadata } from "./layout";
import { HowDoesItWork } from "./_components/how-it-works";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-screen-lg flex-1">
      <div className="flex flex-1 flex-col space-y-4 px-8 py-6">
        <div className="py-8 sm:py-8">
          <h1
            className={
              "text-balance text-center text-4xl leading-snug tracking-wide sm:text-6xl"
            }
          >
            <div className="">
              <span className="font-semibold text-primary-600">SquareVote</span>{" "}
              is a microapp for quadratic voting
            </div>
          </h1>

          <p className="py-4 text-center text-lg sm:py-12 sm:text-3xl sm:font-medium">
            Empower Every Voice, Weigh Every Opinion
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

        <HowDoesItWork />

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/poll/clsrkyfzi0000s9u40r0z10oe`}
            width={"100%"}
            height={500}
            scrolling="no"
          />
        </div>

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/poll/clsrkyfzi0000s9u40r0z10oe/results`}
            width={"100%"}
            height={400}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
