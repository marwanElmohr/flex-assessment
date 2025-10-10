# Reviews Dashboard

This project is a **frontend-only Reviews Dashboard** built for the **Flex Living Developer Assessment**.  
It allows property managers to view, filter, and manage guest reviews (mocked from the Hostaway API).

## Overview

The dashboard helps Flex Living managers:

- See per-property performance across all listings.
- Filter reviews by:
  - Listing name
  - Channel
  - Category
  - Rating
  - Dates
- Approve or unapprove reviews for public display.
- View only approved reviews on a property display page.

All reviews are loaded from a **mocked JSON file** simulating Hostaway API responses, because using the provided API key gave a server denied error.

## Deployment

This project was deployed using Vercel and can be accessed here: [https://flex-assessment-9km83efb2-marwans-projects-9f932668.vercel.app/](https://flex-assessment-9km83efb2-marwans-projects-9f932668.vercel.app/)

## Tech Stack

- Frontend: JS + React + Tailwind
- Integration: Optional Hostaway API and Google Places Details API
- Config: dotenv for environment variables

## Architecture and Data Flow

- Reviews are read from src/data/mock_hostaway_reviews.json.
- The Google endpoint queries the Places Details API when GOOGLE_PLACES_API_KEY is set.

## Review Schema

- id: int
- channelId: int
- type: string
- status: string
- rating: int
- publicReview: string (based on given pdf)
- privateFeedback: int (1 if can be publicly viewed, 0 if not)
- reviewCategory: array
- submittedAt: date
- listingName: string
- guestName: string
- channel: string (added based on channel map)

## Key Design and Logic Decisions

- Simplicity first: easy to run locally.
- File-based persistence: Keeps the demo self-contained and transparent.
- Deterministic normalization:
  - Dates coerced to ISO for consistent filtering and sorting.
  - Uniform response contract regardless of raw source shape.
- Graceful failure modes:
  - Missing or malformed mock data → return empty list safely.
- Filtering/sorting: Keeps UI simpler and reduces client logic.
- Optional integrations: Google endpoint degrades with status: "unconfigured" when API key is absent.

## Operational Notes

- **Run locally**: `npm install` → `npm start` → open `http://localhost:3000`
- **Environment**: Set `GOOGLE_PLACES_API_KEY` to enable the Google endpoint; otherwise it reports `unconfigured`, and `REACT_APP_HOSTAWAY_API_KEY` to enable the Hostaway endpoint.

## Extension Points

- Add pagination or additional filters to fetchReviews.
- Introduce authentication/authorization for approval actions if moving beyond a demo.

## Google Reviews (Exploration Findings)

Explored integration using Google Places API.

API provides review data via the place/details endpoint.

Requires Google Place IDs for each property.

Billing must be enabled on a Google Cloud project and I cant use mine.

Each account receives $300 monthly free credit (sufficient for small use).

Integration was not completed due to lack of billing setup and missing Place IDs.

Future work: map each listing to its Google Place ID and enable limited integration under free tier.

## AI Tools

- Chatgpt was used to help with debigging for some doubts i had throughout the project.
