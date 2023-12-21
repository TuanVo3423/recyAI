import type { ComponentStyleConfig } from '@chakra-ui/theme';

const Button: ComponentStyleConfig = {
  baseStyle: {
    w: '100%',
    minW: '100px',
    borderRadius: '6px',
    fontWeight: 'bold',
    lineHeight: 1,
    display: 'flex',
    align: 'center',
  },

  variants: {
    primary: {
      bg: '#3f04d8',
      background: 'red.400',
      color: 'gray.100',
      borderRadius: 'md',
      boxShadow: 'md',
      borderWidth: '1px',
      borderColor: '#e5e0df',
      minHeight: '16px',
      width: 'fit-content',
      padding: '12px 16px',

      _hover: {
        bg: '#3d4de4',
        background: '#3d4de4',
      },

      _active: {
        // bg: "#B1C36B",
        // background: "#B1C36B",
        // backdropFilter: "blur(3px)",
      },

      _disabled: {
        background: 'blackAlpha.800',
        opacity: 0.5,
        _hover: {
          background: 'blackAlpha.800 !important',
        },
      },
    },
    secondary: {
      bg: 'blackAlpha.700',
      background: 'blackAlpha.700',
      color: 'whiteAlpha.900',

      _hover: {
        bg: 'blackAlpha.800',
        background: 'blackAlpha.800',
      },

      _active: {
        // bg: "#B1C36B",
        // background: "#B1C36B",
        // backdropFilter: "blur(3px)",
      },

      _disabled: {
        background: 'blackAlpha.800',
        opacity: 0.5,
        _hover: {
          background: 'blackAlpha.800 !important',
        },
      },
    },
    secondary_2: {
      bg: '#999999',
      background: '#999999',
      color: 'gray.100',
      borderRadius: 'md',
      boxShadow: 'md',
      borderWidth: '1px',
      borderColor: '#e5e0df',
      minHeight: '16px',
      width: 'fit-content',
      padding: '12px 16px',

      _hover: {
        opacity: 0.7,
      },

      _active: {
        bg: '#3f04d8',
        background: '#3f04d8',
        // bg: "#B1C36B",
        // background: "#B1C36B",
        // backdropFilter: "blur(3px)",
      },

      _disabled: {
        background: 'blackAlpha.800',
        opacity: 0.5,
        _hover: {
          background: 'blackAlpha.800 !important',
        },
      },
    },
    outline: {
      bg: 'transparent',
      background: 'transparent',
      color: '#2208cc',
      borderColor: '#2208cc',
      minHeight: '2rem',
      width: 'fit-content',
      padding: '12px 16px',
      borderRadius: 'md',
      borderWidth: '2px',
      boxShadow: 'md',
      _hover: {
        bg: '#EBD2F4',
        background: '#EBD2F4',
      },

      _active: {
        bg: '#B1C36B',
        background: '#B1C36B',
        backdropFilter: 'blur(3px)',
      },

      _disabled: {
        background: 'blackAlpha.800',
        opacity: 0.5,
        _hover: {
          background: 'blackAlpha.800 !important',
        },
      },
    },
  },

  sizes: {
    sm: {
      h: '44px',
    },

    md: {
      h: '50px',
    },
  },

  // The default variant value
  defaultProps: {
    variant: 'primary',
  },
};

export default Button;
