export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    category?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Boat Airdopes 131",
        price: 1299,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuthSUJwn_g9fAnqnT3G7gU50Lb0e4HlCUsg&s",
        description: "Wireless earbuds with 13mm drivers, 15-hour battery life, and IPX4 water resistance",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Noise ColorFit Pro 4",
        price: 2999,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmaLD99DhgA-s_465gbz6qg5Ztut-y6_bTVg8zHWuSevY_3YIAXwFbGRXjN0lhEpbEoRVvYMkqqn-drvVkkmYizaM5eBBdW8cBxti-D6kGixG--NOsrLN4sw",
        description: "Smart fitness band with SpO2 monitoring, heart rate tracking, and 7-day battery life",
        category: "Electronics"
    },
    {
        id: 3,
        name: "Tata Coffee Gold",
        price: 299,
        imageUrl: "https://m.media-amazon.com/images/I/61cMHd80RLL.jpg",
        description: "Premium coffee blend from the hills of Karnataka, rich and aromatic",
        category: "Food & Beverage"
    },
    {
        id: 4,
        name: "Fabindia Cotton Kurta",
        price: 1299,
        imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSBMCIjhmEgZo2atgTlDq8PKNcnfU84Bmaj4i0SuOWIDn8lDoQXhd-VtesZnLS6g9z9-Kikm33dqVR7McewuWbk5Sx3ViGwuAzsg9_zdQujWAJuDA4AuNpOJw",
        description: "Handwoven cotton kurta in traditional Indian design, comfortable and elegant",
        category: "Clothing"
    },
    {
        id: 5,
        name: "OnePlus Wireless Charger",
        price: 1999,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSQTkMQGOCremUHZysBkriJcxajunQnqf7s2z23PZqrEnry2lo4Le_fehLKbKcq3b9n5bYIejHdF--SG9Z-6Qr-t6wuzQxbqfTkhyDy4XgtOFNkqihe8lZx",
        description: "Fast wireless charging pad with 30W power delivery and LED indicator",
        category: "Electronics"
    },
    {
        id: 6,
        name: "Himalayan Salt Lamp",
        price: 899,
        imageUrl: "https://m.media-amazon.com/images/I/61mC9O9C6+L.jpg",
        description: "Natural Himalayan salt lamp for ambient lighting and air purification",
        category: "Home & Office"
    },
    {
        id: 7,
        name: "Yoga Mat by Decathlon",
        price: 599,
        imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRcbnP_FearZGkgDLdl5AWojAWl2TBgNESW2IuOVPVsmoS70uA8sXGTP2-lQmumL4_03oNagfoD8RNyc7JG8r8OyvQrHm0-RkQ05P2ONCi8e7KyLBKoJAV7_rc",
        description: "Non-slip yoga mat perfect for Indian yoga practices, lightweight and portable",
        category: "Sports & Fitness"
    },
    {
        id: 8,
        name: "Terracotta Tea Set",
        price: 799,
        imageUrl: "https://www.terracottabysachii.com/cdn/shop/files/Sustainable_Kolkata_Terracotta_Pottery_Teaset_for_4_1.jpg?v=1723954984",
        description: "Handcrafted terracotta tea set from Rajasthan, traditional Indian design",
        category: "Home & Office"
    },
    {
        id: 9,
        name: "Kashmiri Saffron",
        price: 2499,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlbjgmDNcFefdC33eV1I7Q6_OsGCZ5p2waw&s",
        description: "Premium Kashmiri saffron, the world's most expensive spice, 2g pack",
        category: "Food & Beverage"
    },
    {
        id: 10,
        name: "Banarasi Silk Saree",
        price: 8999,
        imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSr88mS4yVf-PFen7Aa_zGsnaw3KJ2i6hrLwNsCzrImgCzdB98GtlJzG5O1xzIWXH4rxGT0P9N2MLG_plFQobqRdhl2YK_Lnz5PNBu38mJehYtZ3ogeXjv0",
        description: "Authentic Banarasi silk saree with intricate zari work, perfect for special occasions",
        category: "Clothing"
    }
];

export function getProductById(id: number): Product | undefined {
    return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(product => product.category === category);
}

export function getAllProducts(): Product[] {
    return products;
}
