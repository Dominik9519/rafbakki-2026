// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let name = "", email = "", message = "", recipient = "", website = "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body?.name ?? "";
      email = body?.email ?? "";
      message = body?.message ?? "";
      recipient = body?.recipient ?? "";
      website = body?.website ?? "";
    } else {
      const form = await req.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      message = String(form.get("message") ?? "");
      recipient = String(form.get("recipient") ?? "");
      website = String(form.get("website") ?? "");
    }

    if (website) return NextResponse.json({ success: true });

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Brak wymaganych pól." }, { status: 400 });
    }

    const toCandidates =
      recipient === "adalgeir"
        ? [process.env.MAIL_ADALGEIR]
        : recipient === "dominik"
        ? [process.env.MAIL_DOMINIK]
        : [process.env.MAIL_ADALGEIR, process.env.MAIL_DOMINIK];

    const to = toCandidates.filter((v): v is string => Boolean(v));
    if (to.length === 0) {
      return NextResponse.json({ success: false, error: "Brak adresatów MAIL_*." }, { status: 500 });
    }

    const from = process.env.MAIL_FROM || "Rafbakki <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,                       // string[]
      subject: `Ný skilaboð af vefnum — ${name}`,
      replyTo: email,           // <-- poprawna nazwa pola
      text:
        `Nafn: ${name}\n` +
        `Netfang: ${email}\n` +
        `Móttakandi: ${recipient}\n\n` +
        `Skilaboð:\n${message}\n`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: (error as any)?.message || JSON.stringify(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || JSON.stringify(err) },
      { status: 500 }
    );
  }
}
