import { business, fullAddressLines, whatsappNumber } from '../config/business'
import { quoteEndpoint } from '../lib/quote'
import { PageHeader } from '../components/PageHeader'

// Written from what the site actually does: one form, no analytics, no
// cookies, fonts served from this site, Google Maps only on request.
export function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy policy"
        lede={<p>What happens to the details you send us, in plain words. Last updated 28 October 2026.</p>}
      />
      <section className="bg-paper py-20 lg:py-28">
        <div className="frame">
          <div className="prose-road">
            <h2>What we collect</h2>
            <p>
              Only what you type into the quote request form: your name, phone number and, if you give them, your company name and email address, along with
              the details of the service you choose (for example pickup and delivery locations or origin and destination, the goods, weight or quantity, storage period and location, preferred date and any notes).
            </p>
            <p>The website does not use analytics, advertising trackers or cookies.</p>

            <h2>Why we collect it</h2>
            <p>
              To answer your request: to call you back, ask anything we need to price the load, and send you a quotation. If you go ahead, we use the same
              details to schedule the truck and move your goods.
            </p>
            <p>We do not sell your details, and we do not use them for marketing.</p>

            <h2>How it reaches us</h2>
            {quoteEndpoint ? (
              <p>
                When you send the form, your details pass through a form-handling service that delivers them to our inbox. That service processes them only
                to deliver your request to us.
              </p>
            ) : (
              <p>
                For now the form does not send anything over the internet. It checks your details and lets you copy them, and you bring or send the request
                to us yourself. Nothing you type is stored or transmitted by this website.
              </p>
            )}
            {whatsappNumber && <p>If you share a request on WhatsApp instead, it is handled under WhatsApp's own terms and privacy policy.</p>}

            <h2>Maps</h2>
            <p>
              The office maps on this site stay switched off until you choose <strong>Show map here</strong>. Only then does your browser load the map from
              Google, which shares your visit with Google under its own privacy policy. The <strong>Directions</strong> and <strong>Open in Google Maps</strong>{' '}
              links take you to Google's website.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep quote requests for as long as we need them to answer you and, if you book with us, for our business records. Ask us at any time and we
              will delete a request that didn't lead to a booking.
            </p>

            <h2>Your choices</h2>
            <p>You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Contact us at:</p>
            <ul>
              <li>
                {business.name}, {fullAddressLines.join(', ')}
              </li>
              {business.phone && <li>Phone: {business.phone}</li>}
              {business.email && <li>Email: {business.email}</li>}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
