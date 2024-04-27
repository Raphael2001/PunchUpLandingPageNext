import ApiServer from "api/requests/server";
import styles from "./home.module.scss";

async function init() {
  const res = await ApiServer.init({});
  const json = await res.json();

  return json;
}
export default async function Home() {
  return <main className={styles.main}></main>;
}
