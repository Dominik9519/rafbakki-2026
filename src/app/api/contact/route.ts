// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  recipient: "adalgeir" | "dominik" | "both" | string;
  website?: string; // honeypot
};

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: ContactPayload;

    if (contentType.includes("application/json")) {
      const body = (await req.json()) as Partial<ContactPayload>;
      data = {
        name: body.name ?? "",
        email: body.email ?? "",
        message: body.message ?? "",
        recipient: (body.recipient as ContactPayload["recipient"]) ?? "both",
        website: body.website ?? "",
      };
    } else {
      const form = await req.formData();
      data = {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
        recipient: String(form.get("recipient") ?? "both"),
        website: String(form.get("website") ?? ""),
      };
    }

    // honeypot – jeśli bot uzupełni pole, udaj sukces i nic nie wysyłaj
    if (data.website) {
      return NextResponse.json({ success: true });
    }

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: "Brak wymaganych pól." },
        { status: 400 }
      );
    }

    const toCandidates =
      data.recipient === "adalgeir"
        ? [process.env.MAIL_ADALGEIR]
        : data.recipient === "dominik"
        ? [process.env.MAIL_DOMINIK]
        : [process.env.MAIL_ADALGEIR, process.env.MAIL_DOMINIK];

    const to = toCandidates.filter(
      (v): v is string => typeof v === "string" && v.length > 0
    );

    if (to.length === 0) {
      return NextResponse.json(
        { success: false, error: "Brak adresatów (sprawdź MAIL_*)." },
        { status: 500 }
      );
    }

    const from = process.env.MAIL_FROM || "Rafbakki <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from,
      to,
      subject: `Ný skilaboð af vefnum — ${data.name}`,
      replyTo: data.email, // poprawna nazwa pola w Resend
      text:
        `Nafn: ${data.name}\n` +
        `Netfang: ${data.email}\n` +
        `Móttakandi: ${data.recipient}\n\n` +
        `Skilaboð:\n${data.message}\n`,
    });

    if (result.error) {
      const msg =
        typeof result.error === "object" &&
        result.error !== null &&
        "message" in result.error
          ? String((result.error as { message?: unknown }).message)
          : String(result.error);
      return NextResponse.json(
        { success: false, error: msg },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
