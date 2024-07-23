import { FC } from "react";

const Character: FC<{alt: string, className: string, character: string}> = (props): JSX.Element => {
    return (
        <img
        alt={props.alt}
        className={props.className}
        src={props.character}
      ></img>
    )
}

export default Character;