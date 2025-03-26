import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavLinks } from "./util/components/NavLinks";

export const metadata: Metadata = {
    title: "Elden Ring Build Tools - Erdtree",
    description: "Elden Ring Build Tools - Armor, Weapon and Class Optimizer",
    authors: { name: "Camburgaler", url: "https://github.com/Camburgaler" },
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const VERSION = require("../../package.json").version;
    return (
        <html lang="en">
            <body>
                <NavLinks />
                {children}
                <Analytics />
                <SpeedInsights />
                <footer>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <p>
                            Forked from{" "}
                            <a href="https://github.com/vodofrede">vodofrede</a>
                            &apos;s Erdtree Planner
                        </p>
                        <p>
                            v{VERSION} of Erdtree Planner (available under
                            BSD-3-Clause license)
                        </p>
                    </span>
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "right",
                        }}
                    >
                        <p>
                            © 2024-2025{" "}
                            <a href="https://github.com/Camburgaler">
                                Camburgaler
                            </a>
                        </p>
                        <p>
                            Have suggestions? Submit a{" "}
                            <a href="https://github.com/Camburgaler/erdtree/issues/new?template=feature_request.md">
                                feature request
                            </a>{" "}
                            or a{" "}
                            <a href="https://github.com/Camburgaler/erdtree/issues/new?template=bug_report.md">
                                bug report
                            </a>
                            !
                        </p>
                    </span>
                </footer>
            </body>
        </html>
    );
}
