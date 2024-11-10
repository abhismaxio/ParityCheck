import { subscriptionTier, TierName } from "@/data/subscriptionTiers";
import { relations } from "drizzle-orm";
import { boolean, index, pgEnum, pgTable, primaryKey, real, text, timestamp, uuid} from "drizzle-orm/pg-core";


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
export const ProductRelations = relations(ProductTable,(({one,many})=>({
    productCustomisation: one(ProductCustomisationTable),
    productViews : many(ProductViewTable),
    countryGroupDiscount :many(countryGroupDiscountTable),
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
export const ProductViewRelations = relations(ProductViewTable,(({one,})=>({
    product: one(ProductTable,{
        fields:[ProductViewTable.productId],
        references: [ProductTable.id],
    }),
    country: one(CountryTable,{
        fields:[ProductViewTable.countryId],
        references: [CountryTable.id],
    })
})))




export const CountryTable = pgTable("countries",{
    id: uuid().primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
    Code:text("code").notNull().unique(),
    countryGroudId: uuid("country_group_id").notNull().references(()=>CountryGroupTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt,
})
export const countryRelations = relations(CountryTable,({one,many})=>({
    countryGroups : one(CountryGroupTable,{
        fields:[CountryTable.countryGroudId],
        references: [CountryGroupTable.id],
    }),
    productViews:many(ProductViewTable)

}))



export const CountryGroupTable = pgTable("country_group",{
    id:uuid().primaryKey().defaultRandom(),
    name:text("name").notNull().unique(),
    recommendedDiscountPercentage: real("recommended_discount_percentage"),
    createdAt,
    updatedAt,
})
export const countryGroupRelations = relations(CountryGroupTable,({many})=>({
    countries:many(CountryTable),
    countryGroupDiscount: many(countryGroupDiscountTable)
}))





export const countryGroupDiscountTable = pgTable("Country_group_discounts",{
    countryGroupId: uuid().notNull().references(()=> CountryGroupTable.id,{onDelete:"cascade"}),
    productId:uuid().notNull().references(()=>ProductTable.id,{onDelete:"cascade"}),
    coupon:text("coupon").notNull(),
    discountPercentage: real("discount_percentage").notNull(),
    createdAt,
    updatedAt,
},table=>({
    pk: primaryKey({columns:[table.countryGroupId,table.productId]}),
}))
export const countryGroupDiscountRelations = relations(countryGroupDiscountTable,({one})=>({
    product:one(ProductTable,{
        fields:[countryGroupDiscountTable.productId],
        references:[ProductTable.id],
    }),
    countryGroup:one(CountryGroupTable,{
        fields:[countryGroupDiscountTable.countryGroupId],
        references:[CountryGroupTable.id],
    }),
}))

export const TierEnum = pgEnum("tier",Object.keys(subscriptionTier)as[TierName])

export const UserSubscriptionTable = pgTable("user_subscription",{
    id:uuid("id").primaryKey().defaultRandom(),
    clerkUserId:text("clerk_user_id").notNull().unique(),
    stripeSubscriptionItemId:text("stripe_subscription_item_id"),
    stripeCustomerId:text("stripe_customer_id"),
    tier: TierEnum("tier").notNull(),
    createdAt,
    updatedAt,
},table=>({
    clerkUserIdIndex: index("user_subsciptions.clerk_user_id_index").on(
        table.clerkUserId
    ),
    stripeCustomerIdIndex: index(
        "user_subsciptions.stripe_customer_id_index"
    ).on(table.stripeCustomerId)

    }))
