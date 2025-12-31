export async function onRequestPost(context) {
  try {
    // 1. Parse the form data sent from your HTML website
    const formData = await context.request.formData();
    const userEmail = formData.get('email');
    const userName = formData.get('name');
    const userMessage = formData.get('message');

    // 2. Prepare data for Mailgun
    // Mailgun expects FormData, not JSON
    const mailgunData = new FormData();
    mailgunData.append('from', `Website Contact <postmaster@${context.env.MAILGUN_DOMAIN}>`);
    mailgunData.append('to', 'juniorsanchez2015@gmail.com'); // Where you want to receive it
    mailgunData.append('subject', 'New Contact Form Submission');
    mailgunData.append('text', `From: ${userName} <${userEmail}>\n\nMessage:\n${userMessage}`);
    // You can also use 'html' instead of 'text' if you want rich formatting

    // 3. Create the Basic Authentication token
    // Mailgun requires "api:YOUR_KEY" encoded in base64
    const token = btoa(`api:${context.env.MAILGUN_API_KEY}`);

    // 4. Send to Mailgun API
    const response = await fetch(
      `https://api.mailgun.net/v3/${context.env.MAILGUN_DOMAIN}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${token}`,
          // Note: Do NOT set 'Content-Type' manually when using FormData; 
          // fetch handles the boundary automatically.
        },
        body: mailgunData,
      }
    );

    if (response.ok) {
      return new Response("Email sent successfully!", { status: 200 });
    } else {
      // It's helpful to log the error text to see what went wrong
      const errorText = await response.text();
      return new Response("Failed to send email: " + errorText, { status: 500 });
    }
  } catch (err) {
    return new Response("Server error: " + err.message, { status: 500 });
  }
}