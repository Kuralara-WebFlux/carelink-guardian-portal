import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from "./components/DashboardContext";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://carelink.kuralara.com"),
  title: {
    default: "CareLink Guardian Portal",
    template: "%s | CareLink Guardian Portal",
  },
  description: "CareLink Guardian Portal is a production-ready senior care management platform for resident health records, caregiver workflows, guardian visibility, notifications, and clinical reports.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "CareLink Guardian Portal",
    description: "Role-scoped senior care dashboards, notifications, and professional healthcare reports.",
    images: [{ url: "/logo/logo-horizontal.png", width: 1200, height: 630, alt: "CareLink Guardian Portal" }],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#EC4899",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DashboardProvider>
          <ServiceWorkerRegistration />
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}
