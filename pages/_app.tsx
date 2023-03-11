import "prismjs/themes/prism.css";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";
import "@/styles/globals.css";
import "@/styles/notion.css";
import "@/styles/blogpost.css";
import BLOG from "@/blog.config";
import dynamic from "next/dynamic";
import { LocaleProvider } from "@/lib/locale";
import Scripts from "@/components/Scripts";
import { Analytics } from "@vercel/analytics/react";

const Ackee = dynamic(() => import("@/components/Ackee"), { ssr: false });
const Gtag = dynamic(() => import("@/components/Gtag"), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Scripts />
      <LocaleProvider>
        <>
          {BLOG.isProd && BLOG?.analytics?.provider === "ackee" && (
            <Ackee
              ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
              ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
            />
          )}
          {BLOG.isProd && BLOG?.analytics?.provider === "ga" && <Gtag />}
          <Component {...pageProps} />
        </>
      </LocaleProvider>
    </>
  );
}

export default MyApp;
