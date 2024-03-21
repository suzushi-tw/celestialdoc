import { mysqlTable, serial, varchar, text, timestamp, boolean} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
 id: serial('id').primaryKey(),
 email: varchar('email', { length: 256 }).unique(),
 stripeCustomerId: varchar('stripe_customer_id', { length: 256 }).unique(),
 stripeSubscriptionId: varchar('stripe_subscription_id', { length: 256 }).unique(),
 stripePriceId: varchar('stripe_price_id', { length: 256 }),
 stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
 filesThisMonth: integer('files_this_month').default(0),
 language: varchar('language', { length: 256 }).default('none'),
 Gptmodel: varchar('gpt_model', { length: 256 }).default('gpt-3.5-turbo-16k'),
 Gpt4ThisMonth: integer('gpt_4_this_month').default(0),
 selectedfiles: varchar('selected_files', { length: 256 }).default('none'),
});

export const files = mysqlTable('files', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  uploadStatus: varchar('upload_status', { length: 256 }).default('PENDING'),
  url: varchar('url', { length: 2048 }),
  key: varchar('key', { length: 256 }),
  createdAt: timestamp('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: timestamp('updated_at').default('CURRENT_TIMESTAMP').onUpdate('CURRENT_TIMESTAMP'),
  userId: serial('user_id').references(() => users.id),
 });
 

 export const stripeSubscriptions = mysqlTable('stripe_subscriptions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 256 }).unique(),
  stripePriceId: varchar('stripe_price_id', { length: 256 }),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),
  createdAt: timestamp('created_at').default('CURRENT_TIMESTAMP'),
 });
  
  // drizzle-orm
  // drizzle-kit