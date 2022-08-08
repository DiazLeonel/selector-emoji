import { forwardRef, useRef, useState, useEffect } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";

import styles from "./emojiPicker.module.scss"

export function EmojiPicker(props, refInput) {

    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState(emojiList);
    const containerRef = useRef(null);


    useEffect(() => {
        window.addEventListener('click', e => {
            if (!containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setEmojis(emojiList)
            }
        })
    }, [])

    function handleCLickOpen() {
        setIsOpen(!isOpen);
    }


    function handleSearch(e) {
        const q = e.target.value;

        if (!!q) {
            const search = emojiList.filter((emoji) => {
                return (
                    emoji.name.toLowerCase().includes(q) ||
                    emoji.keywords.toLowerCase().includes(q)
                )
            })
            setEmojis(search)
        } else {
            setEmojis(emojiList)
        }

    }

    // function EmojiPickerContainer() {
    //     return (<div>
    //         <EmojiSearch onSearch={handleSearch} />
    //         <div>{
    //             emojis.map((emoji) => (
    //                 <div key={emoji.symbol}>{emoji.symbol}</div>
    //             ))}
    //         </div>
    //     </div>
    //     )
    // }
    function handleOnClickEmoji(emoji) {
        const cursorPosition = refInput.current.selectionStart;
        const text = refInput.current.value;
        const prev = text.slice(0, cursorPosition);
        const next = text.slice(cursorPosition);

        refInput.current.value = prev + emoji.symbol + next;
        refInput.current.selectionStart = cursorPosition + emoji.symbol.length;
        refInput.current.selectionEnd = cursorPosition + emoji.symbol.length;
        refInput.current.focus()
    }


    return <div ref={containerRef} className={styles.inputContainer}>
        <button onClick={handleCLickOpen} className={styles.emojiPickerButton}>🙂</button>
        {isOpen ? (
            <div className={styles.emojiPickerContainer} >
                <EmojiSearch onSearch={handleSearch} />
                <div className={styles.emojiList}>{
                    emojis.map((emoji) => (
                        <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji} />
                    ))}
                </div>
            </div>) : ("")}
    </div>
}

export default forwardRef(EmojiPicker)