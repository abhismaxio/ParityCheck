export type TierName = keyof typeof subscriptionTier;

export const subscriptionTier ={
    Free:{
        name:"Free",
        priceInCents:0,
        maxNumberOfProducts:1,
        maxNumberOfVisits:5000,
        canAccessAnalytics:false,
        canCustomizeBanner:false,
        canRemoveBranding:false,
    },
    Basic:{
        name:"Basic",
        priceInCents:190,
        maxNumberOfProducts:5,
        maxNumberOfVisits:15000,
        canAccessAnalytics:true,
        canCustomizeBanner:false,
        canRemoveBranding:false,
    },
    Standard:{
        name:"Standard",
        priceInCents:300,
        maxNumberOfProducts:15,
        maxNumberOfVisits:25000,
        canAccessAnalytics:true,
        canCustomizeBanner:true,
        canRemoveBranding:false,
    },
    Premium:{
        name:"Premium",
        priceInCents:500,
        maxNumberOfProducts:1,
        maxNumberOfVisits:5000,
        canAccessAnalytics:true,
        canCustomizeBanner:true,
        canRemoveBranding:true,
    }

} as const

export const subscriptionTierInOrder=[
    subscriptionTier.Free,
    subscriptionTier.Basic,
    subscriptionTier.Standard,
    subscriptionTier.Premium,
]as const