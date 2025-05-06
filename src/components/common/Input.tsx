"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type props = { textArea?:boolean,placeholder: string } & React.ComponentProps<"input">;
function Input({ placeholder,textArea, ...rest }: props) {
  const inputRef = useRef<HTMLInputElement|HTMLTextAreaElement>(null!);
  const [hidePlaceholder, setHidePlaceholder] = useState(false);
  const labelVariant = {
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    initial: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };
  return (
    <div
      onClick={() => inputRef.current.focus()}
      className="flex flex-col gap-2 "
    >
      <AnimatePresence>
        {!hidePlaceholder && (
          <motion.label
            variants={labelVariant}
            animate="animate"
            initial="initial"
            exit="exit"
            className="font-Inter text-white"
          >
            {placeholder}
          </motion.label>
        )}
      </AnimatePresence>
     {
        textArea
        ?
        //@ts-ignore
        <textarea ref={inputRef} className="input h-[5rem] resize-none"/>
        :
        <input
        //@ts-ignore
        ref={inputRef}
        onFocus={() => setHidePlaceholder(true)}
        onBlur={() => setHidePlaceholder(false)}
        {...rest}
        className="input"
      />
     }
    </div>
  );
}

export default Input;
