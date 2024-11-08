

import { relations } from "drizzle-orm";
import { boolean, index, pgTable, real, text, timestamp, uuid} from "drizzle-orm/pg-core";


const createdAt = timestamp("created_at",{withTimezone:true}).defaultNow()
const updatedAt = timestamp("updated_at",{withTimezone:true}).notNull().defaultNow().$onUpdate(()=> new Date())

export const ProductTable = pgTable(
    "products",
    {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkUserId: text("clerk_user_id").notNull(),
    name: text("name").notNull(),
        description: text("description"),
        url: text("url").notNull(),
        createdAt,
        updatedAt,
    },table=>({
    clerkUserId : index("products.clerk_user_id_index").on(
        table.clerkUserId
    ),
}))
export const ProductRelations = relations(ProductTable,(({one})=>({
    productCustomisation: one(ProductCustomisationTable),
})))

export const ProductCustomisationTable = pgTable("product_customisation",{
    id: uuid("id").primaryKey().defaultRandom(),
    classPrefix : text("clasPrefix"),
    productId:uuid("product_id")
        .notNull()
        .references(()=>ProductTable.id,{onDelete:"cascade"})
        .unique(),
    locationMessage:text("location_message")
        .notNull()
        .default(
            "It look like you are fomr this <b>{country}</b> use Coupen <b>{coupon} </b> to get <b> {discount}%</b>"
        ),
    backgoundColor:text("background_color")
        .notNull()
        .default("hsl(193,82%,31%)"),
    textColor:text("text_color").notNull().default("hsl(0,0%,100%)"),
    fontSize:text("font_size").notNull().default("1rem"),
    bannerContainer:boolean("is_sticky").notNull().default(true),
    createdAt,
    updatedAt,


})
export const productCustomisationRelation =relations(ProductCustomisationTable,({one})=>({
    product:one(ProductTable,{
        fields: [ProductCustomisationTable.productId],
        references:[ProductTable.id]
    }),
}))

export const ProductViewTable = pgTable("product_view",{
    id: uuid("id").primaryKey().defaultRandom(),
    productId:uuid("product_id").notNull().references(()=>ProductTable.id,{onDelete:"cascade"}),
    countryId:uuid("country_id").references(()=>CountryTable.id,{onDelete:"cascade"}),
    visitedAt: timestamp("visited_at",{withTimezone:true}).notNull().defaultNow(),
})

export const CountryTable = pgTable("countries",{
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    Code:text("code").notNull().unique(),
    countryGroudId: uuid("country_group_id").notNull().references(()=>CountryGroupTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt,
})
export const CountryGroupTable = pgTable("country_group",{
    id:uuid().primaryKey().defaultRandom(),
    name:text("name").notNull().unique(),
    recommendedDiscountPercentage: real("recommended_discount_percentage"),
    createdAt,
    updatedAt,
})