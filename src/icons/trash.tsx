import { createIcon } from "@chakra-ui/react";

export const TrashIcon = createIcon({
    displayName: "TrashIcon",
    viewBox: "0 0 24 24",
    defaultProps: {
        fill: "none",
        color: "white",
    },
    path: (
        <>
            <path
                d="M2.40039 5.40005H21.6004M8.40039 1.80005H15.6004M16.2004 22.2H7.80039C6.47491 22.2 5.40039 21.1255 5.40039 19.8L4.85247 6.65001C4.82407 5.96826 5.36909 5.40005 6.05143 5.40005H17.9493C18.6317 5.40005 19.1767 5.96826 19.1483 6.65001L18.6004 19.8001C18.6004 21.1255 17.5259 22.2 16.2004 22.2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
});
