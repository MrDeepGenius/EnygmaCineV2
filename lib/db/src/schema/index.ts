import { pgTable, text, integer, jsonb, timestamp, serial } from "drizzle-orm/pg-core";

export interface CustomEpisode {
  temporada: number;
  episodio: number;
  titulo: string;
  url: string;
  url2?: string;
}

export const customSeriesTable = pgTable("custom_series", {
  id: text("id").primaryKey(),
  category: text("category").notNull().default("anime"),
  titulo: text("titulo").notNull(),
  sinopsis: text("sinopsis").notNull().default(""),
  poster: text("poster").notNull().default(""),
  backdrop: text("backdrop").notNull().default(""),
  trailer: text("trailer").notNull().default(""),
  genero: text("genero").notNull().default(""),
  anio: text("anio").notNull().default(""),
  actores: jsonb("actores").$type<string[]>().notNull().default([]),
  tmdbId: text("tmdb_id"),
  episodios: jsonb("episodios").$type<CustomEpisode[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CustomSeries = typeof customSeriesTable.$inferSelect;
export type InsertCustomSeries = typeof customSeriesTable.$inferInsert;

export const bannersTable = pgTable("banners", {
  id: serial("id").primaryKey(),
  position: integer("position").notNull().default(0),
  contentId: text("content_id"),
  titulo: text("titulo").notNull().default(""),
  subtitulo: text("subtitulo").notNull().default(""),
  ctaLabel: text("cta_label").notNull().default("Ver ahora"),
  imagenUrl: text("imagen_url").notNull().default(""),
  enabled: integer("enabled").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Banner = typeof bannersTable.$inferSelect;
export type InsertBanner = typeof bannersTable.$inferInsert;

export interface SiteConfigData {
  top10: string[];
  recommended: string[];
  categories: Record<string, "anime" | "kdrama">;
  alturls: Record<string, string>;
  genres: string[];
}

export const siteConfigTable = pgTable("site_config", {
  id: integer("id").primaryKey().default(1),
  data: jsonb("data").$type<SiteConfigData>().notNull().default({
    top10: [],
    recommended: [],
    categories: {},
    alturls: {},
    genres: [],
  }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SiteConfigRow = typeof siteConfigTable.$inferSelect;
