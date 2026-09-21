# Routes

Planned route architecture for NOVA. These are documented for planning only; not all routes are implemented in this task.

## Public

| Route                 | Notes                                    |
| --------------------- | ---------------------------------------- |
| `/`                   | Home / marketing landing                 |
| `/explore`            | Experience discovery with filters        |
| `/experiences`        | Experience listing (paginated, filtered) |
| `/experiences/[slug]` | Experience detail                        |
| `/categories`         | Category listing                         |
| `/categories/[slug]`  | Category detail with experiences         |
| `/hosts`              | Host directory                           |
| `/hosts/[slug]`       | Public host profile                      |
| `/about`              | About NOVA                               |
| `/journal`            | Blog/journal index                       |
| `/journal/[slug]`     | Journal article                          |
| `/faq`                | Frequently asked questions               |

## Authentication

| Route              | Notes                            |
| ------------------ | -------------------------------- |
| `/login`           | Sign in                          |
| `/register`        | Register new account             |
| `/forgot-password` | Request password reset           |
| `/reset-password`  | Reset password (token-based)     |
| `/verify-email`    | Email verification (token-based) |

## Customer

| Route                      | Notes                     |
| -------------------------- | ------------------------- |
| `/dashboard`               | Customer dashboard root   |
| `/dashboard/overview`      | Personal overview         |
| `/dashboard/bookings`      | List of customer bookings |
| `/dashboard/bookings/[id]` | Booking detail            |
| `/dashboard/wishlist`      | Saved experiences         |
| `/dashboard/profile`       | Profile management        |
| `/dashboard/settings`      | Account settings          |

## Host

| Route                         | Notes                         |
| ----------------------------- | ----------------------------- |
| `/host`                       | Host dashboard root           |
| `/host/overview`              | Host overview                 |
| `/host/experiences`           | List host's experiences       |
| `/host/experiences/new`       | Create experience             |
| `/host/experiences/[id]`      | Experience detail (host view) |
| `/host/experiences/[id]/edit` | Edit experience               |
| `/host/bookings`              | Incoming bookings             |
| `/host/customers`             | Customer directory            |
| `/host/analytics`             | Booking/revenue analytics     |
| `/host/settings`              | Host settings                 |

## Admin

| Route                | Notes                   |
| -------------------- | ----------------------- |
| `/admin`             | Admin panel root        |
| `/admin/users`       | Manage users            |
| `/admin/users/[id]`  | User detail             |
| `/admin/hosts`       | Manage hosts            |
| `/admin/experiences` | Manage experiences      |
| `/admin/bookings`    | Manage bookings         |
| `/admin/categories`  | Manage categories       |
| `/admin/reports`     | Reported content/issues |
| `/admin/settings`    | Platform settings       |

## Notes

- Authentication routes are public and redirect authenticated/unauthenticated users appropriately.
- Customer, Host, and Admin sections are role-gated.
- This document does not implement routes.
