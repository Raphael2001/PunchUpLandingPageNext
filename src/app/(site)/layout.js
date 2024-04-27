import Footer from "components/Footer/Footer";
import Popups from "popups/popup";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="site">
        {children}

        <Footer />
      </div>

      <Popups className="site" />
    </>
  );
}
