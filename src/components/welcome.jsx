import { useRef } from "react";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

// fonts and weights we want to apply to each character 
const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
}


// function to control the text  hover effect 
const setupTextHover = (container, type) => {
    if (!container) return; // if there is no container we simply exist the function 
    // if there is a container  we want to get access to the letters:

    const letters = container.querySelectorAll("span")

    // first assigns min max and default the name base 
    const { min, max, default: base } = FONT_WEIGHTS[type]

    const animateLetters = (letter, weight, duration = 0.25) => {
        return gsap.to(
            letter, {
            duration, ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`,
        }
        )
    }

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2))
            const intensity = Math.exp(-(distance ** 2) / 20000)


            animateLetters(letter, min + (max - min) * intensity);
        })
    }


    // new function to  control the hover  effect when the mouse leaves the text area ;

    const handleMouseLeave = () => {

        letters.forEach((letter) => animateLetters(letter, base, 0.3))
    }
    // call handlemousemove  and handleMouseLeave function ;
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave);


    return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
    }

}
const renderText = (text, className, baseWeight = 400) => {

    // ...text is similar to text.split 
    // This maps over each individual char
    //  and gets an index for that character.
    return [...text].map((char, i) => (
        <span  //span element for each of the char 
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {/* inside the span we enter a char. */}
            {char === " " ? '\u00a0' : char}
            {/* this means if the character is an empty space
 then we render a unicode character 
  for no break space (otherwise we render the char) */}
        </span>
    )
    )
}




export const welcome_code = () => {

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        // create callback function 

        setupTextHover(titleRef.current, 'title');
        setupTextHover(subtitleRef.current, 'subtitle')
    }, [
        // dependancy array defining when this will happpen 
        // it will only happen at the start 
    ]

    )
    return (
        <section
            id="welcome"
        >
            <div>

                {/* why this function not function-ing  */}
                <p ref={subtitleRef}>
                    {renderText(
                        "Hi i'm macharia! Welcome to my ",
                        'text-2xl  font-georama ',
                        100
                    )
                    }
                </p>

                <h1 ref={titleRef} className="mt-4">
                    {renderText("portfolio", 'text-9xl italic font-georama ', 400)}
                </h1>

            </div>

            <div className="small-screen">
                <h1>This portfolio is designed for desktops/tablets only </h1>
            </div>
        </section>
    )


}
