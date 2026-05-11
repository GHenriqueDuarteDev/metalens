import { ExifDataPayload } from "@/src/types/database";
import { pgTable, uuid, varchar, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";

// Enum para controlar o status de visibilidade do relatório
export const visibilityEnum = pgEnum("visibility", ["unlisted", "public", "private"]);

export const users = pgTable("users", {
  // UUID gerado automaticamente pelo banco
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}).enableRLS();

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),

  // user_id é nulo por padrão para permitir o "Guest Mode" (usuários anônimos)
  userId: uuid("user_id").references(() => users.id),

  // unlisted: apenas quem tem o link acessa.
  visibility: visibilityEnum("visibility").default("unlisted").notNull(),

  // Coluna rígida para indexação e buscas rápidas
  cameraModel: varchar("camera_model", { length: 255 }),

  // O coração do sistema: JSONB para flexibilidade total dos metadados extraídos
  exifData: jsonb("exif_data").$type<ExifDataPayload>().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
}).enableRLS();
