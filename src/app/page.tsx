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
              <span className="font-semibold text-primary-600">SquareVote</span>{" "}
              is a microapp for
            </div>
            <div>quadratic voting</div>
          </h1>

          <p className="py-4 text-center text-xl sm:py-16 sm:text-2xl">
            Create a poll, share the link, and vote with your friends.
          </p>

          <div className="flex justify-center gap-2">
            <Button as="a" href={"/dashboard/new"} size="lg" variant="primary">
              Create Poll
            </Button>
            <Button size="lg">How does it work?</Button>
          </div>
        </div>

        <div className="rounded border">
          <iframe
            src={`${metadata.metadataBase?.origin}/poll/clsrkyfzi0000s9u40r0z10oe`}
            width={"100%"}
            height={300}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
