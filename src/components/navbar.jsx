import dayjs, { Dayjs } from "dayjs";
const dislayTime = () => {
    return <time datetime="current">{dayjs().format("ddd mmm D h:mm:A")}</time>;
};
import { navIcons, navLinks } from "../constants";
const data = [
    { id: 1, name: "portfolio" },
    { id: 2, name: "contact" },
    { id: 3, name: "projects" },
];
export const Navbar = () => {
    return (
        <nav className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/public/images/logo.svg" />
                    <p className="font-bold">Macharia's MAC_OS portfolio</p>
                </div>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name} </p>
                        </li>
                    ))}
                </ul>

                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img
                                src={img}
                                className="icon-hover"
                                alt={"icon-${id}"}
                            ></img>
                        </li>
                    ))}
                </ul>

                <time datetime="current">
                    {dayjs().format("ddd MMM D h:mm:A")}
                </time>
            </div>
        </nav>
    );
};
