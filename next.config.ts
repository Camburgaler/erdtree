/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value:
                            "script-src http: https:  'nonce-" +
                            Buffer.from(crypto.randomUUID()).toString(
                                "base64"
                            ) +
                            "' 'strict-dynamic' 'unsafe-inline' 'self'; object-src 'none'; base-uri 'none'; require-trusted-types-for 'script';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
