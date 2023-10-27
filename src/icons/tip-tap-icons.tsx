import { createIcon } from "@chakra-ui/react";

export const RotateLeftIcon = createIcon({
    displayName: "RotateLeftIcon",
    viewBox: "0 0 24 24",
    defaultProps: {
        fill: "none",
        color: "black",
    },
    path: (
        <>
            <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
        </>
    ),
});
