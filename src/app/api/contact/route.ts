import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type BodyShape = {
  name?: string;
  email?: string;
  message?: string;
  recipient?: "adalgeir" | "dominik" | "both" | string;
  website?: string; // honeypot
};

function getEnv(name: string, optional = false) {
  const v = process.env[name];
  if (!v && !optional) throw new Error(`Missing env: ${name}`);
  return v || "";
}

export async function POST(req: Request) {
  try {
    // 1) parse body (JSON lub FormData)
    const contentType = req.headers.get("content-type") || "";
    let name = "", email = "", message = "", recipient = "", website = "";
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as BodyShape;
      name = body.name?.trim() ?? "";
      email = body.email?.trim() ?? "";
      message = body.message?.trim() ?? "";
      recipient = body.recipient ?? "both";
      website = body.website ?? "";
    } else {
      const form = await req.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      message = String(form.get("message") ?? "");
      recipient = String(form.get("recipient") ?? "both");
      website = String(form.get("website") ?? "");
    }

    // 2) honeypot – udaj sukces przy spamie
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Brak wymaganych pól." },
        { status: 400 }
      );
    }

    // 3) recipients
    const toCandidates =
      recipient === "adalgeir"
        ? [process.env.MAIL_ADALGEIR]
        : recipient === "dominik"
        ? [process.env.MAIL_DOMINIK]
        : [process.env.MAIL_ADALGEIR, process.env.MAIL_DOMINIK];

    const to = toCandidates.filter((v): v is string => Boolean(v));
    if (to.length === 0) {
      return NextResponse.json(
        { success: false, error: "Brak adresatów (MAIL_*)." },
        { status: 500 }
      );
    }

    // 4) transporter (Gmail SMTP)
    const host = getEnv("SMTP_HOST");
    const port = Number(getEnv("SMTP_PORT"));
    const secure = String(getEnv("SMTP_SECURE")).toLowerCase() === "true";
    const user = getEnv("SMTP_USER");
    const pass = getEnv("SMTP_PASS");
    const from = process.env.MAIL_FROM || `Rafbakki <${user}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    // 5) send
    await transporter.sendMail({
      from,
      to, // string[]
      subject: `Ný skilaboð af vefnum — ${name}`,
      replyTo: email,
      text:
        `Nafn: ${name}\n` +
        `Netfang: ${email}\n` +
        `Móttakandi: ${recipient}\n\n` +
        `Skilaboð:\n${message}\n`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Server error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
