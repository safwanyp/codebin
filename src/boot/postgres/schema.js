import { relations } from "drizzle-orm";
import { index, text, timestamp, uuid, pgSchema } from "drizzle-orm/pg-core";

// =============================================
// ================== Schemas ==================
// =============================================
const codebinSchema = pgSchema("codebin");

// =============================================
// ================== Tables ===================
// =============================================
const usersTable = codebinSchema.table(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    emailConfirmedAt: timestamp("email_confirmed_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
  },
  (table) => {
    return {
      users_emailIndex: index("users__email_index").on(table.email),
      users_idIndex: index("users__id_index").on(table.id)
    };
  }
);

const sessionsTable = codebinSchema.table(
  "sessions",
  {
    id: uuid("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date"
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
  },
  (table) => {
    return {
      sessions_userIdIndex: index("sessions__user_id_index").on(table.userId)
    };
  }
);

const snippetsTable = codebinSchema.table(
  "snippets",
  {
    id: uuid("id").primaryKey(),
    content: text("content").notNull(),
    author_id: uuid("author_id")
      .notNull()
      .references(() => usersTable.id)
  },
  (table) => {
    return {
      snippets_authorIdIndex: index("snippets__author_id_index").on(
        table.author_id
      ),
      snippets_idIndex: index("snippets__id_index").on(table.id)
    };
  }
);

// ===============================================
// ================== Relations ==================
// ===============================================
const usersRelations = relations(usersTable, ({ many }) => ({
  snippets: many(snippetsTable)
}));

const snippetsRelations = relations(snippetsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [snippetsTable.author_id],
    references: [usersTable.id]
  })
}));

export {
  usersTable,
  usersRelations,
  sessionsTable,
  snippetsTable,
  snippetsRelations
};
