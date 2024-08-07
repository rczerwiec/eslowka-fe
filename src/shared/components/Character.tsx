import { FC } from "react";
//classname dla cssa zdjecia - "select-none" na poczatku
const Character: FC<{alt: string, className: string, character: string}> = (props): JSX.Element => {
    return (
        <img
        alt={props.alt}
        className={props.className}
        src={props.character}
        draggable="false"
      ></img>
    )
}

export default Character;