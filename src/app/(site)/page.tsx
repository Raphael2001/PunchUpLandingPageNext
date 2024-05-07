import ApiServer from "api/requests/server";
import styles from "./home.module.scss";
import Header from "components/Header/Header";
import HomeBanner from "components/HomeBanner/HomeBanner";
import AboutUs from "components/AboutUs/AboutUs";
import Form from "components/Form/Form";
import MetaTagsData from "components/MetaTagsData/MetaTagsData";
import JumpToForm from "components/JumpToForm/JumpToForm";

async function init() {
  const res = await ApiServer.init({});
  const json = await res.json();

  return json;
}
export default async function Home() {
  return (
    <main className={styles.main}>
      <MetaTagsData />
      <Header />
      <HomeBanner />
      <JumpToForm />

      <AboutUs />
      <Form />
    </main>
  );
}
