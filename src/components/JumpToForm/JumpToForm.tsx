import GlowingButton from "components/GlowingButton/GlowingButton";
import styles from "./JumpToForm.module.scss";

export default function JumpToForm() {
  return (
    <div className={styles["skip-to-form"]}>
      <GlowingButton title="בוא נדבר" href="#lead-form" />
    </div>
  );
}
