# Domain

The core data entities of NOVA. These documents describe intent only — no database models are implemented in this task.

## User

**Purpose:** Represents any authenticated person on the platform. The base identity for all roles.

**Important fields:**

- `id` (UUID/ULID)
- `email`
- `name`
- `avatar` (Media reference)
- `locale` (`fa` or `en`)
- `role` (`customer`, `host`, `admin`)
- `createdAt`, `updatedAt`

**Relationships:**

- Has one Profile (settings/preferences).
- Has many Bookings (as customer).
- Has many Reviews (as customer).
- May be a Host (one-to-one Host extension).
- May be an Admin (role flag).

## Host

**Purpose:** A User who publishes and manages experiences. Extends the base User.

**Important fields:**

- `id` (references User)
- `bio`
- `location` (Location reference)
- `verified` (boolean)
- `paymentSettings` (opaque reference to payment config)
- `createdAt`, `updatedAt`

**Relationships:**

- Belongs to one User.
- Has many Experiences.
- Receives many Bookings via those Experiences.
- Has many Reviews.

## Experience

**Purpose:** A bookable urban experience, creative space, workshop, or event offered by a Host.

**Important fields:**

- `id`
- `slug` (unique, URL-safe)
- `title`
- `description`
- `category` (Category reference)
- `host` (Host reference)
- `location` (Location reference)
- `media` (Media references)
- `price`
- `currency`
- `schedule` (availability/recurrence rules)
- `duration`
- `capacity` / `spots`
- `status` (`draft`, `published`, `archived`)
- `createdAt`, `updatedAt`

**Relationships:**

- Belongs to one Host.
- Belongs to one Category.
- Has one Location.
- Has many Media.
- Has many Bookings.
- Has many Reviews.

## Category

**Purpose:** Groups experiences into types (e.g., workshops, tours, creative sessions).

**Important fields:**

- `id`
- `slug`
- `name` (localized)
- `description`
- `icon` or `media` (Media reference)

**Relationships:**

- Has many Experiences.

## Booking

**Purpose:** A customer's reservation for an instance of an Experience.

**Important fields:**

- `id`
- `reference` (human-readable booking number)
- `experience` (Experience reference)
- `customer` (User reference)
- `host` (Host reference, denormalized for access)
- `schedule` (resolved instance: date + time)
- `participants` (count)
- `price` (snapshot)
- `status` (`pending`, `confirmed`, `canceled`, `completed`, `refunded`)
- `createdAt`, `updatedAt`

**Relationships:**

- Belongs to one Customer (User).
- Belongs to one Experience.
- Belongs to one Host (via Experience).
- May have one Review.

## Review

**Purpose:** A customer's feedback on a completed booking/experience.

**Important fields:**

- `id`
- `booking` (Booking reference)
- `experience` (Experience reference)
- `customer` (User reference)
- `host` (Host reference)
- `rating` (e.g., 1–5)
- `comment`
- `createdAt`

**Relationships:**

- Belongs to one Booking (one-to-one review per booking).
- Belongs to one Experience.
- Belongs to one Customer (User).
- Belongs to one Host.

## Location

**Purpose:** Geographic and address information for an Experience or Host.

**Important fields:**

- `id`
- `title` / address line
- `lat`, `lng` (optional)
- `city`
- `region`
- `country`
- `postalCode` (optional)

**Relationships:**

- Referenced by Experiences and Hosts.

## Session

**Purpose:** A short-lived authentication/auth token lifecycle record. Not a platform data entity in the same way as the others, but tracked for security/revoke.

**Important fields:**

- `id`
- `user` (User reference)
- `expiresAt`
- `revoked` (boolean)
- `createdAt`

**Relationships:**

- Belongs to one User.

## Media

**Purpose:** Stored file references (images, documents) for users, experiences, categories.

**Important fields:**

- `id`
- `url` (or signed storage path)
- `alt` (optional)
- `type` (`image`, etc.)
- `width`, `height` (optional)

**Relationships:**

- Referenced by Users, Experiences, Categories.

## Notes

- Fields are listed at the level of intent. Do not invent fields beyond these unless a later task requires them.
- Relationships use the pattern "X belongs to Y / Y has many X."
