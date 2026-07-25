interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: string
  }>
}

export const emailService = {
  // Send welcome email
  sendWelcomeEmail: async (email: string, name: string) => {
    const html = `
      <h2>Welkom bij EduLens! 🎓</h2>
      <p>Hallo ${name},</p>
      <p>Bedankt voor het registreren op EduLens, het AI-onderwijsdashboard voor basisscholen.</p>
      <p>Je account is nu actief en je kunt direct beginnen.</p>
      <p><a href="https://edulens.nl/login" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Inloggen</a></p>
      <p>Vragen? Neem contact op: support@edulens.nl</p>
    `
    // In production, use SendGrid, Mailgun, or AWS SES
    console.log('Email sent to:', email)
    return true
  },

  // Send invoice email
  sendInvoiceEmail: async (email: string, invoiceId: string, amount: number) => {
    const html = `
      <h2>Uw EduLens Factuur 📋</h2>
      <p>Factuur: ${invoiceId}</p>
      <p>Bedrag: €${(amount / 100).toFixed(2)}</p>
      <p>Bedankt voor uw betaling!</p>
      <p><a href="https://edulens.nl/billing" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Bekijk Facturering</a></p>
    `
    console.log('Invoice email sent to:', email)
    return true
  },

  // Send trial ending email
  sendTrialEndingEmail: async (email: string, name: string, daysLeft: number) => {
    const html = `
      <h2>Uw Trial Eindigt Binnenkort! ⏰</h2>
      <p>Hallo ${name},</p>
      <p>Uw 14-daagse gratis trial eindigt over ${daysLeft} dagen.</p>
      <p>Upgrade nu naar Pro of Enterprise om door te gaan.</p>
      <p><a href="https://edulens.nl/pricing" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Upgraden</a></p>
    `
    console.log('Trial ending email sent to:', email)
    return true
  },

  // Send payment failed email
  sendPaymentFailedEmail: async (email: string, amount: number) => {
    const html = `
      <h2>Betaling Mislukt 😞</h2>
      <p>We konden uw betaling van €${(amount / 100).toFixed(2)} niet verwerken.</p>
      <p>Controleer uw betaalgegevens en probeer het opnieuw.</p>
      <p><a href="https://edulens.nl/billing" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Opnieuw Proberen</a></p>
    `
    console.log('Payment failed email sent to:', email)
    return true
  },

  // Send upgrade confirmation
  sendUpgradeConfirmationEmail: async (email: string, newPlan: string) => {
    const html = `
      <h2>Upgrade Bevestigd! 🎉</h2>
      <p>U bent succesvol geupgrade naar het ${newPlan} plan.</p>
      <p>U hebt nu toegang tot alle premium functies.</p>
      <p><a href="https://edulens.nl" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Naar Dashboard</a></p>
    `
    console.log('Upgrade confirmation email sent to:', email)
    return true
  },
}
