import { integer, text, boolean, pgTable, serial, varchar, timestamp, } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 256 }).unique(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 256 }).unique(),
  stripePriceId: varchar('stripe_price_id', { length: 256 }),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
  filesThisMonth: integer('files_this_month').default(0),
});


export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  uploadStatus: varchar('upload_status', { length: 256 }).default('PENDING'),
  url: varchar('url', { length: 2048 }),
  key: varchar('key', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  userId: serial('user_id').references(() => users.id),
});



export const stripeSubscriptions = pgTable('stripe_subscriptions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 256 }).unique(),
  stripePriceId: varchar('stripe_price_id', { length: 256 }),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
  createdAt: timestamp('created_at').defaultNow(),
});

// drizzle-orm
// drizzle-kit