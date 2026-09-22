fixitnow_frontend/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                        # Home
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _components/
│   │   │   │   │   ├── service-grid.tsx
│   │   │   │   │   ├── service-filters.tsx
│   │   │   │   │   └── service-card.tsx
│   │   │   │   └── _actions/
│   │   │   │       └── get-services.ts
│   │   │   ├── technicians/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── _components/
│   │   │   │       │   ├── technician-header.tsx
│   │   │   │       │   ├── review-list.tsx
│   │   │   │       │   └── book-now-panel.tsx
│   │   │   │       └── _actions/
│   │   │   │           └── get-technician.ts
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _components/
│   │   │   │   │   └── login-form.tsx
│   │   │   │   └── _actions/
│   │   │   │       └── login.ts
│   │   │   └── register/
│   │   │       ├── page.tsx
│   │   │       ├── _components/
│   │   │       │   ├── register-form.tsx
│   │   │       │   └── role-selector.tsx
│   │   │       └── _actions/
│   │   │           └── register.ts
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx                      # shared dashboard shell (sidebar/nav)
│   │   │   ├── customer/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _components/
│   │   │   │   │   ├── booking-history-table.tsx
│   │   │   │   │   ├── payment-history-table.tsx
│   │   │   │   │   └── status-badge.tsx
│   │   │   │   ├── _actions/
│   │   │   │   │   ├── get-bookings.ts
│   │   │   │   │   ├── get-payments.ts
│   │   │   │   │   └── cancel-booking.ts
│   │   │   │   └── bookings/
│   │   │   │       └── [id]/
│   │   │   │           └── pay/
│   │   │   │               ├── page.tsx
│   │   │   │               ├── _components/
│   │   │   │               │   └── payment-checkout.tsx
│   │   │   │               └── _actions/
│   │   │   │                   └── create-payment.ts
│   │   │   │
│   │   │   ├── technician/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── _components/
│   │   │   │   │   ├── earnings-overview.tsx
│   │   │   │   │   ├── profile-form.tsx
│   │   │   │   │   └── availability-calendar.tsx
│   │   │   │   ├── _actions/
│   │   │   │   │   ├── get-profile.ts
│   │   │   │   │   ├── update-profile.ts
│   │   │   │   │   └── update-availability.ts
│   │   │   │   └── bookings/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── _components/
│   │   │   │       │   └── booking-actions-table.tsx
│   │   │   │       └── _actions/
│   │   │   │           ├── get-technician-bookings.ts
│   │   │   │           └── update-booking-status.ts
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── _components/
│   │   │       │   ├── stats-cards.tsx
│   │   │       │   └── user-table.tsx
│   │   │       ├── _actions/
│   │   │       │   ├── get-users.ts
│   │   │       │   ├── ban-user.ts
│   │   │       │   └── get-admin-bookings.ts
│   │   │       └── categories/
│   │   │           ├── page.tsx
│   │   │           ├── _components/
│   │   │           │   └── category-form.tsx
│   │   │           └── _actions/
│   │   │               ├── get-categories.ts
│   │   │               └── create-category.ts
│   │   │
│   │   ├── payment/
│   │   │   ├── success/page.tsx
│   │   │   └── cancel/page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   └── ui/                                 # shadcn-generated, don't touch manually
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── table.tsx
│   │       ├── dialog.tsx
│   │       ├── badge.tsx
│   │       └── ...
│   │
│   ├── components/shared/                      # your own cross-role components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── booking-status-badge.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                            # shadcn's cn()
│   │   ├── api-client.ts                       # fetch wrapper w/ base URL, auth header
│   │   └── types.ts
│   │
│   ├── hooks/
│   │   └── use-auth.ts
│   │
│   └── middleware.ts                           # → proxy.ts on Next 16, per your route protection
│
├── components.json                              # shadcn config
└── package.json