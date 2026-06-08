import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, phone, email, service, message } = body

    // Validation
    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Phone validation
    if (phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    console.log('📧 Sending email via Resend...')
    console.log('From:', process.env.RESEND_FROM_EMAIL)
    console.log('To:', process.env.RESEND_TO_EMAIL)

    // Send email to business
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'nizarhayat351@gmail.com',
      subject: `New Estimate Request - ${service}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 6px; border-left: 4px solid #0066cc; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${escapeHtml(phone)}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${escapeHtml(email)}</a></p>
            <p><strong>Service:</strong> ${escapeHtml(service)}</p>
            <p><strong>Message:</strong></p>
            <p style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 4px; white-space: pre-wrap;">
              ${message ? escapeHtml(message) : 'No message provided'}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Reply to this email to respond to the customer.
          </p>
        </div>
      `,
    })

    console.log('✅ Business email sent:', emailResponse)

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: email,
        subject: 'We received your estimate request - IBAAD Contracting',
        replyTo: process.env.RESEND_TO_EMAIL || 'nizarhayat351@gmail.com',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #333;">Thank You for Your Request!</h2>
            <p>Hi ${escapeHtml(name)},</p>
            <p>We've received your estimate request for <strong>${escapeHtml(service)}</strong>.</p>
            <p>Our team will review your details and contact you shortly, typically within 24 hours on business days.</p>
            <p>If you need immediate assistance, please call us at <strong><a href="tel:9299449040">929-944-9040</a></strong>.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              <strong>IBAAD Contracting Corp</strong><br>
              Serving NYC & surrounding areas
            </p>
          </div>
        `,
      })
      console.log('✅ Customer confirmation email sent')
    } catch (confirmError) {
      console.warn('⚠️ Failed to send confirmation email:', confirmError)
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ EMAIL ERROR:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to send email'

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send your message. Please try again or call us at 929-944-9040.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}

// Handle GET requests - return 405 Method Not Allowed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  )
}

// Security: Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}