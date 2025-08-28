"use client";

import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  EmailIcon,
  XIcon,
} from "react-share";

export default function ShareButtons({
  title,
  url,
  size,
}: {
  title: string;
  url: string;
  size: number;
}) {
  return (
    <div className="flex gap-3  justify-center p-2">
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={size} round />
      </TwitterShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={size} round />
      </TelegramShareButton>

      <EmailShareButton url={url} subject={title}>
        <EmailIcon size={size} round />
      </EmailShareButton>
    </div>
  );
}
