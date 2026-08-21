# Global Speaker conversion roadmap

## V1 acquisition path

Homepage visitor
→ Language Map start
→ Language Map completion
→ WhatsApp click
→ Conversation
→ Trial or session
→ Student

The V1 Language Map is processed in the visitor's browser. It is not silently sent to analytics, a database, a CRM, an email service, or a form backend. The visitor explicitly chooses whether to open the prepared WhatsApp message and whether to send it.

## Future event vocabulary

These names are reserved for later instrumentation. No analytics events are emitted in V1.

- `language_map_started`
- `language_selected`
- `goal_selected`
- `language_map_completed`
- `whatsapp_handoff_clicked`
- `resource_opened`

## Future KPIs

- Language Map start rate
- Language Map completion rate
- WhatsApp handoff rate
- Qualified conversation rate
- Session conversion rate
- Student conversion rate

Measurement should be added only after an analytics provider, consent approach, and event ownership have been explicitly approved.

## Required preview and production configuration

- `NEXT_PUBLIC_SITE_URL`: the complete canonical origin, including `https://`.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: the international contact number, including country code. Formatting characters are accepted and normalized.
- `NEXT_PUBLIC_CONTACT_EMAIL`: optional direct-contact fallback.
- `NEXT_PUBLIC_BOOKING_URL`: reserved for a future booking destination; unused in V1.

All `NEXT_PUBLIC_` values are embedded at build time. Set them in the target environment before building the preview or production artifact.
