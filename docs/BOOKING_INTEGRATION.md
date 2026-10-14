# Meeting booking: current state and remaining integration

## What the existing interface does

Visitors can move through the scheduling preview, choose a platform, date and sample time, provide contact details, review their selections and download a tentative calendar draft. WhatsApp supports a voice/video preference and international phone-number validation.

The available times are illustrative, not a live calendar. Contact details remain in the browser flow. No appointment is reserved, no message or invitation is sent, no Zoom or Teams meeting is generated, and no WhatsApp call is placed. The calendar file explicitly labels the event PREVIEW — NOT BOOKED and marks it tentative.

There is no backend, database, calendar account connection or email service in this project.

## Configuration warning

dist/meeting-config.js contains legacy empty public placeholders. The current scheduler.js does not read them. Filling these values alone will NOT activate live booking.

Do not put passwords, API secrets, access tokens or private credentials into any file under dist: all hosted frontend files can be downloaded by visitors.

## Connecting a real service

Choose a booking provider with the required platform integrations, or implement a server-side booking service. Wire that service into the existing interface.

A production flow needs:
- Real working hours, timezone handling and available times.
- Reservation confirmation and conflict protection.
- Validation on the server as well as the frontend.
- Zoom/Teams meeting creation where supported and connected.
- Confirmation, cancellation and rescheduling handling.
- Appropriate handling of visitor contact details.
- Clear success and error states based on real service responses.

For WhatsApp, record the agreed call type and number and define who starts the scheduled call. A chat link alone does not schedule or place a voice/video call. Confirm the intended WhatsApp calling workflow before presenting it as a completed integration.

WORKX IT's actual calendar account and WhatsApp number must be supplied and connected. Do not use Tangora's contact details as WORKX IT's.

## Before launch

Verify the real booking flow from another account, overlapping bookings, timezone changes, cancellation, notifications and failed requests. Check mobile layout, dialog close controls and keyboard navigation. Replace illustrative availability only when the live service is operational. A frontend completion screen must never claim a real reservation without confirmation from that service.

