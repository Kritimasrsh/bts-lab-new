/**
 * Single source of truth for BTS Lab contact details. Update here and every
 * page (contact, about, footer, WhatsApp button, doorstep CTA) stays in sync.
 */
export const CONTACT = {
  /** Mobile numbers, display form. */
  phonesDisplay: ["+977 9851128220", "+977 9851061725"],
  /** tel: hrefs for the mobiles. */
  phonesTel: ["+9779851128220", "+9779851061725"],
  /** Landline, display + tel. */
  landlineDisplay: "01-5916220",
  landlineTel: "+97715916220",
  /** WhatsApp number for wa.me links (primary mobile, no +). */
  whatsapp: "9779851128220",
  address: "New Road, Kathmandu, Nepal",
  addressShort: "New Road, Kathmandu",
  /** Google Maps embed for the actual BTS Lab location. */
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.926021811101!2d85.30767167425394!3d27.703285525672808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb195f8a79678d%3A0x8fc197cd07d8375a!2sBTS%20LAB%20(Mobile%20Screen%20Refurb%20Lab)!5e1!3m2!1sen!2snp!4v1786348780673!5m2!1sen!2snp",
  /** Directions link to the BTS Lab place. */
  directions:
    "https://www.google.com/maps/search/?api=1&query=BTS%20LAB%20Mobile%20Screen%20Refurb%20Lab",
} as const;
