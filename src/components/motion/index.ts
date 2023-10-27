interface IFadeInProps {
    show?: any;
    hidden?: any;
    transition?: any;
}

export const fadeIn = ({ show, hidden, transition }: IFadeInProps) => {
    return {
        hidden: {
            opacity: 0,
            ...hidden,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ...transition,
            },
            ...show,
        },
    };
};

export const movePage = {
    exit: { opacity: 0, transition: { duration: 0.5 } },
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1 } },
};

interface ILeftToRightProps {
    delay?: number;
}

export const LeftToRight = ({ delay }: ILeftToRightProps) => {
    return {
        exit: { opacity: 0 },
        initial: { opacity: 0, x: -50 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                delay,
                duration: 0.5,
            },
        },
    };
};

export const hoverTapMotion = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 1.03 },
};
export const boxQAMotion = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
};

export const boxQAPopoverMotion = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, width: "100%" },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};
