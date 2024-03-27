import { integer, text, boolean, pgTable, varchar, timestamp, serial} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
 id: varchar('id', { length: 256 }).primaryKey(), // Changed from serial to varchar
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
 userId: varchar('user_id', { length: 256 }).references(() => users.id), // Changed from serial to varchar
});



// drizzle-orm
// drizzle-kit