export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/"],
        },
        sitemap: "https://maweiza.com/sitemap.xml",
        host: "https://maweiza.com",
    };
}
