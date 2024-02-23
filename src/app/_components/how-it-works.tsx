import { MoveRight, ThumbsUp } from "lucide-react";
import { A } from "./ui/a";
import { cn } from "~/utils/cn";
import { P } from "./ui/text";

export function HowDoesItWork() {
  return (
    <details className="block">
      <summary className="cursor-pointer p-2 text-lg">
        What is Quadratic Voting?
      </summary>
      <div className="rounded border p-4">
        <P>
          Quadratic voting is a democratic system where each additional vote
          costs more, calculated by squaring the number of votes. This
          encourages voters to prioritize issues they care about most, as
          casting multiple votes for one option becomes increasingly expensive.
          It aims to balance majority rule with minority protection, giving a
          more nuanced picture of public opinion compared to one-person-one-vote
          systems.
        </P>

        <div className="mx-auto max-w-lg divide-y rounded border">
          {Array(3)
            .fill(0)
            .map((_, i) => {
              const votes = i + 1;
              const credits = votes * votes;
              return (
                <div key={votes} className="h-28">
                  <div className="flex h-full flex-1 items-center">
                    <div className="flex flex-1 flex-col items-center">
                      <div
                        className={cn("flex flex-wrap gap-1", {
                          ["w-9"]: votes === 2,
                          ["w-14"]: votes === 3,
                        })}
                      >
                        {Array(credits)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="size-4 bg-gray-900" />
                          ))}
                      </div>
                      <div className="font-semibold">
                        {credits} voice credit{credits > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div>
                      <MoveRight />
                    </div>

                    <div className="flex flex-1 flex-col items-center">
                      <div className="flex">
                        {Array(votes)
                          .fill(0)
                          .map((_, i) => (
                            <ThumbsUp key={i} />
                          ))}
                      </div>
                      <div className="font-semibold">
                        {votes} vote{votes > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <P>
          Read more at:{" "}
          <A
            href={"https://en.wikipedia.org/wiki/Quadratic_voting"}
            target="_blank"
          >
            Quadratic voting - Wikipedia
          </A>
        </P>
      </div>
    </details>
  );
}
