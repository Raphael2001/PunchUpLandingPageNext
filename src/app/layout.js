import "styles/globals.scss";
import Providers from "components/Providers/Providers";
import Popups from "popups/popup";
import Notifications from "components/Notifications/notifications";
import ScreenLoader from "components/ScreenLoader/ScreenLoader";

const fonts = ["Regular", "Medium", "SemiBold", "Bold", "Light"];
const fontName = "Heebo";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {fonts.map((font) => {
        return (
          <link
            rel="preload"
            href={`/assets/fonts/${fontName}-${font}.ttf`}
            as="font"
            crossOrigin=""
            key={font}
          />
        );
      })}

      <head />

      <body>
        <Providers>
          {children}

          <Notifications />
          <ScreenLoader />
        </Providers>
      </body>
    </html>
  );
}
