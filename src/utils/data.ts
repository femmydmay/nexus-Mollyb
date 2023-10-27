import { Plan } from "@prisma/client";

export const advertOptions = [
  { value: "", label: "--select--" },
  { value: "for sale", label: "for sale" },
  { value: "for rent", label: "for rent" },

];

export const propertyType = [
  { value: "", label: "--select--" },
  { value: "Duplex", label: "Duplex" },
  { value: "Flat Apartment", label: "Flat Apartment" },
  { value: "Terrace", label: "Terrace" },
  { value: "Detached", label: "Detached" },
  { value: "Bungalow", label: "Bungalow" },
  { value: "Studio", label: "Studio" },
  { value: "Semi Detached", label: "Semi Detached" },
  { value: "Mansion", label: "Mansion" },
  { value: "Town House", label: "Town House" },
  { value: "Office Space", label: "Office Space" },
  { value: "Shop", label: "Shop" },
  { value: "Warehouse", label: "Warehouse" },
  { value: "Penthouse", label: "Penthouse" },
  { value: "Land", label: "Land" },
  { value: "Maisonettes", label: "Maisonettes" },
  { value: "High Rise", label: "High Rise" },
  { value: "Block of Flats", label: "Block of Flats" },
  { value: "Hotel", label: "Hotel" },
  { value: "Factory", label: "Factory" },
  { value: "Commercial Property", label: "Commercial Property" },
  { value: "Workspace", label: "Workspace" },
  { value: "Mini Flat", label: "Mini Flat" },
  { value: "House", label: "House", selected: true },
];

export const propertyUse = [
  { value: "", label: "--select--" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  {
    value: "Either Residential or Commercial",
    label: "Either Residential or Commercial",
  },
  { value: "Educational", label: "Educational" },
  { value: "Religious", label: "Religious" },
  { value: "Unspecified", label: "Unspecified", selected: true },
  { value: "Shortlet", label: "Shortlet" },
];

export const available = [
  { value: "", label: "--select--" },
  { value: "Available", label: "Available" },
  { value: "Now Selling", label: "Now Selling" },
  { value: "Coming Soon", label: "Coming Soon" },
  { value: "Unavailable", label: "Unavailable" },
  { value: "Sold Out", label: "Sold Out" },
  { value: "SOLD", label: "SOLD" },
  { value: "Rented / Leased", label: "Rented / Leased" },
];

export const currency = [
  { value: "₦ - Nigeria Naira", label: "₦ - Nigeria Naira" },
  { value: "$ - US Dollar", label: "$ - US Dollar" },
  { value: "₤ - British Pound", label: "$ - US Dollar" },
];
export const totalArea = [
  { value: "sqm", label: "sqm" },
  { value: "heactares", label: "heactares" },
  { value: "acres", label: "acres" },
  { value: "plots", label: "plots" },
  { value: "sqft", label: "sqft" },
];

export const plans_details = [
  // {
    
  //   value: "No of Listings Per Month",
  //   label: "Number of Listings Per Month",
  // },
  // {
    
  //   value: "Listing Expiry",
  //   label: "Listing Expiry",
  // },
  // {
    
  //   value: "Refresh Listings",
  //   label: "Refresh Listings",
  // },
  // {
    
  //   value: "No of Photo Upload",
  //   label: "Number of Photo Upload",
  // },
  // {
    
  //   value: "No of Featured Listings",
  //   label: "Number of Featured Listings",
  // },
  // {
    
  //   value: "No of Listing Boosts",
  //   label: "Number of Listing Boosts",
  // },
  {
    
    value: "Document Upload",
    label: "Document Upload",
  },
  {
    
    value: "Branded Ads/Listings",
    label: "Branded Ads/Listings",
  },
  {
    
    value: "Video Upload",
    label: "Video Upload",
  },
  {
    
    value: "Virtual Tour Embed",
    label: "Virtual Tour Embed",
  },
  {
    
    value: "View Property Requests",
    label: "View Property Requests",
  },
  {
    
    value: "Dedicated Customer Support",
    label: "Dedicated Customer Support",
  },
  {
    
    value: "Social Media Promotion",
    label: "Social Media Promotion",
  },
  {
    
    value: "Featured in Directory",
    label: "Featured in Directory",
  },
  {
    
    value: "Advert-Free Website",
    label: "Advert-Free Website",
  },
  {
    
    value: "Profile Featured in Search Result",
    label: "Profile Featured in Search Result",
  },
  {
    
    value: "Email Marketing",
    label: "Email Marketing",
  },
];


export const limited_stock = [
  {
    img: "../houserent1.jpg",
    description: "1 bedroom house shortlet",
    price: 45500000,
    discount: 50000000,
  },
  {
    img: "../houserent5.jpg",
    description: "4 bedroom detached for rent",
    price: 7000000,
    discount: 8000000,
  },
  {
    img: "../houserent3.jpg",
    description: "4 bedroom flat apt for rent",
    price: 75000000,
    discount: 80000000,
  },
  {
    img: "../houserent6.jpg",
    description: "4 bedroom flat apt for rent",
    price: 4000000,
    discount: 5000000,
  },
  {
    img: "../houserent7.jpg",
    description: "1 bedroom house shortlet",
    price: 4500000,
    discount: 5000000,
  },
  {
    img: "../houserent9.jpg",
    description: "4 bedroom flat apt for sale",
    price: 75000000,
    discount: 80000000,
  },
  {
    img: "../houserent10.jpg",
    description: "4 bedroom flat apt for rent",
    price: 4000000,
    discount: 5000000,
  },
  {
    img: "../houserent11.jpg",
    description: "1 bedroom house shortlet",
    price: 45500000,
    discount: 50000000,
  },
];


export const top_selling = [
  {
    img: "../houserent3.jpg",
    description: "5 bedroom Terrace for sale",
    price: 150000000,
    discount: 160000000,
  },
  {
    img: "../housetop9.jpg",
    description: "4 bedroom Terrace for sale",
    price: 65000000,
    discount: 70000000,
  },
  {
    img: "../housetop10.jpg",
    description: "3 bedroom flat Apartment",
    price: 55000000,
    discount: 60000000,
  },
  {
    img: "../housetop7.jpg",
    description: "4 bedroom Duplex for sale",
    price: 45000000,
    discount: 50000000,
  },
  // {
  //   img: "../housetop5.jpg",
  //   description: "5 bedroom Terrace for sale",
  //   price: 800000000,
  //   discount: 160000000,
  // },
  // {
  //   img: "../housetop6.jpg",
  //   description: "8 bedroom Terrace for sale",
  //   price: 7000000000,
  //   discount: 5000000,
  // },
  // {
  //   img: "../housetop9.jpg",
  //   description: "6 bedroom Terrace for sale",
  //   price: 650000000,
  //   discount: 5000000,
  // },
  // {
  //   img: "../housetop2.jpg",
  //   description: "6 bedroom Terrace for sale",
  //   price: 350000000,
  //   discount: 5000000,
  // },
];


export const priceOptions = [
  { value: "0", label: "Max Price" },
  { value: "500000", label: "₦500,000" },
  { value: "1000000", label: "₦1,000,000" },
  { value: "1500000", label: "₦1,500,000" },
  { value: "2000000", label: "₦2,000,000" },
  { value: "2500000", label: "₦2,500,000" },
  { value: "3000000", label: "₦3,000,000" },
  { value: "3500000", label: "₦3,500,000" },
  { value: "4000000", label: "₦4,000,000" },
  { value: "4500000", label: "₦4,500,000" },
  { value: "5000000", label: "₦5,000,000" },
  { value: "5500000", label: "₦5,500,000" },
  { value: "6000000", label: "₦6,000,000" },
  { value: "6500000", label: "₦6,500,000" },
  { value: "7000000", label: "₦7,000,000" },
  { value: "7500000", label: "₦7,500,000" },
  { value: "8000000", label: "₦8,000,000" },
  { value: "8500000", label: "₦8,500,000" },
  { value: "9000000", label: "₦9,000,000" },
  { value: "9500000", label: "₦9,500,000" },
  { value: "10000000", label: "₦10,000,000" },
  { value: "10500000", label: "₦10,500,000" },
  { value: "11000000", label: "₦11,000,000" },
  { value: "11500000", label: "₦11,500,000" },
  { value: "12000000", label: "₦12,000,000" },
  { value: "12500000", label: "₦12,500,000" },
  { value: "13000000", label: "₦13,000,000" },
  { value: "13500000", label: "₦13,500,000" },
  { value: "14000000", label: "₦14,000,000" },
  { value: "14500000", label: "₦14,500,000" },
  { value: "15000000", label: "₦15,000,000" },
  { value: "15500000", label: "₦15,500,000" },
  { value: "16000000", label: "₦16,000,000" },
  { value: "16500000", label: "₦16,500,000" },
  { value: "17000000", label: "₦17,000,000" },
  { value: "17500000", label: "₦17,500,000" },
  { value: "18000000", label: "₦18,000,000" },
  { value: "18500000", label: "₦18,500,000" },
  { value: "19000000", label: "₦19,000,000" },
  { value: "19500000", label: "₦19,500,000" },
  { value: "20000000", label: "₦20,000,000" },
  { value: "20500000", label: "₦20,500,000" },
  { value: "21000000", label: "₦21,000,000" },
  { value: "21500000", label: "₦21,500,000" },
  { value: "22000000", label: "₦22,000,000" },
  { value: "22500000", label: "₦22,500,000" },
  { value: "23000000", label: "₦23,000,000" },
  { value: "23500000", label: "₦23,500,000" },
  { value: "24000000", label: "₦24,000,000" },
  { value: "24500000", label: "₦24,500,000" },
  { value: "25000000", label: "₦25,000,000" },
  { value: "25500000", label: "₦25,500,000" },
  { value: "26000000", label: "₦26,000,000" },
  { value: "26500000", label: "₦26,500,000" },
  { value: "27000000", label: "₦27,000,000" },
  { value: "27500000", label: "₦27,500,000" },
  { value: "28000000", label: "₦28,000,000" },
  { value: "28500000", label: "₦28,500,000" },
  { value: "29000000", label: "₦29,000,000" },
  { value: "29500000", label: "₦29,500,000" },
  { value: "30000000", label: "₦30,000,000" },
  { value: "30500000", label: "₦30,500,000" },
  { value: "31000000", label: "₦31,000,000" },
  { value: "31500000", label: "₦31,500,000" },
  { value: "32000000", label: "₦32,000,000" },
  { value: "32500000", label: "₦32,500,000" },
  { value: "33000000", label: "₦33,000,000" },
  { value: "33500000", label: "₦33,500,000" },
  { value: "34000000", label: "₦34,000,000" },
  { value: "34500000", label: "₦34,500,000" },
  { value: "35000000", label: "₦35,000,000" },
  { value: "35500000", label: "₦35,500,000" },
  { value: "36000000", label: "₦36,000,000" },
  { value: "36500000", label: "₦36,500,000" },
  { value: "37000000", label: "₦37,000,000" },
  { value: "37500000", label: "₦37,500,000" },
  { value: "38000000", label: "₦38,000,000" },
  { value: "38500000", label: "₦38,500,000" },
  { value: "39000000", label: "₦39,000,000" },
  { value: "39500000", label: "₦39,500,000" },
  { value: "40000000", label: "₦40,000,000" },
  { value: "40500000", label: "₦40,500,000" },
  { value: "41000000", label: "₦41,000,000" },
  { value: "41500000", label: "₦41,500,000" },
  { value: "42000000", label: "₦42,000,000" },
  { value: "42500000", label: "₦42,500,000" },
  { value: "43000000", label: "₦43,000,000" },
  { value: "43500000", label: "₦43,500,000" },
  { value: "44000000", label: "₦44,000,000" },
  { value: "44500000", label: "₦44,500,000" },
  { value: "45000000", label: "₦45,000,000" },
  { value: "45500000", label: "₦45,500,000" },
  { value: "46000000", label: "₦46,000,000" },
  { value: "46500000", label: "₦46,500,000" },
  { value: "47000000", label: "₦47,000,000" },
  { value: "47500000", label: "₦47,500,000" },
  { value: "48000000", label: "₦48,000,000" },
  { value: "48500000", label: "₦48,500,000" },
  { value: "49000000", label: "₦49,000,000" },
  { value: "49500000", label: "₦49,500,000" },
  { value: "50000000", label: "₦50,000,000" },
];



// default plan

export const freeplan:Omit<Plan, 'id'|'createdAt' |'updatedAt' > = {
  title: "Free Plan",
  max_listings: 5,
video_uploads:'',
  image_uploads: '4',
  price: 0,
  other_features:'[]'
}

export const basicplan: Omit<Plan, "id" | "createdAt" | "updatedAt"> = {
  title: "Basic Plan",
  max_listings: 10,
  video_uploads: "", 
  image_uploads: "7",
  price: 10000,
  other_features: "[]",
};

export const goldplan: Omit<Plan, "id" | "createdAt" | "updatedAt"> = {
  title: "Gold Plan",
  max_listings: 20,
  video_uploads: "1",
  image_uploads: "10",
  price: 25000,
  other_features: "[]",
};
export const platinumplan: Omit<Plan, "id" | "createdAt" | "updatedAt"> = {
  title: "Platinum Plan",
  max_listings: 1000,
  video_uploads: "unlimited",
  image_uploads: "unlimited",
  price: 50000,
  other_features: "[]",
};