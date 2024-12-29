import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import {z} from "zod";

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: text('role'),
    name: text('name'),
    phone: integer('phone'),
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
