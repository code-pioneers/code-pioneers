import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = 're_TfUHSRpE_8JNHEFQZMrcaE9cGcSnV65fQ';

const handler = async (_request: Request): Promise<Response> => {
    const { subject, html } = await _request.json();
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
            from: "Lunity Contact <info@lunity.be>",
            to: "info@lunity.be",
            subject,
            html,
        })
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

serve(handler);
