import EmojiPickerInput from "./components/emojiPicker/emojiPickerInput";
import styles from '../src/components/emojiPicker/emojiPicker.module.scss'
function App() {
  return <div className={styles.containerGeneral}>
    <EmojiPickerInput />;
    </div>
}

export default App;
