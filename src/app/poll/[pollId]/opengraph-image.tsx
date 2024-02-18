import { ImageResponse } from "next/og";
import { QRCodeSVG } from "qrcode.react";
import { headers } from "next/headers";
import { metadata } from "~/app/layout";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { fontFamily, loadGoogleFont } from "~/app/opengraph-image";

export const alt = metadata.title;
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image(props: { params: { pollId: string } }) {
  const { pollId } = props.params;
  const fontData = await loadGoogleFont(fontFamily);

  const host = headers().get("host");
  const pollUrl = `https://${host}/poll/${pollId}`;

  const poll = await api.poll.get.query({ id: pollId });
  if (!poll) return notFound();

  return new ImageResponse(
    (
      <div tw="bg-slate-900 w-full h-full flex flex-col justify-center items-center">
        <div tw="text-4xl font-bold text-blue-200 absolute top-8 left-8">
          {metadata.title as string}
        </div>
        <div tw="flex flex-col">
          <div tw="text-[64px] mb-2 text-white">{poll.name}</div>
        </div>
        <div tw="flex bg-white p-4 rounded-lg">
          <QRCodeSVG size={300} value={pollUrl} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: fontFamily,
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
