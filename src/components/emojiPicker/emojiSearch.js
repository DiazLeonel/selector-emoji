import { useState } from "react"
import styles from "./emojiPicker.module.scss"

export default function EmojiSearch({ onSearch }) {
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
        onSearch(e)
    }

    return <input type="text" onChange={handleChange} className={styles.search} value={value} />
}