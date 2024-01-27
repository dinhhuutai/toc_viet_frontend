/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                polish: {
                    '0%': { left: '-85%' },
                    '100%': { left: '100%' },
                },
                vibrate: {
                    '0%': { transform: 'scale(1.1)' },
                    '50%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
                vibrate2: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.3)' },
                },
                slideOpenModalBook: {
                    '0%': {transform: 'translateY(-20px)'},
                    '100%': {transform: 'translateY(0px)'},
                },
                downSlide: {
                    '0%': { height: '0px', display: 'hidden' },
                    '100%': { height: '75px', display: 'block' },
                },
                upSlide: {
                    '0%': { height: '75px', display: 'block' },
                    '100%': { height: '0px', display: 'hidden' },
                },
                downSlide1: {
                    '0%': { height: '0px', display: 'hidden' },
                    '100%': { height: '110.5px', display: 'block' },
                },
                upSlide1: {
                    '0%': { height: '110.5px', display: 'block' },
                    '100%': { height: '0px', display: 'hidden' },
                },
                downSlide2: {
                    '0%': { height: '0px', display: 'hidden' },
                    '100%': { height: '146px', display: 'block' },
                },
                upSlide2: {
                    '0%': { height: '146px', display: 'block' },
                    '100%': { height: '0px', display: 'hidden' },
                },
                loading: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                noticeSlideLeft: {
                    '0%': { transform: 'translateX(calc(100% + 30px))' },
                    '40%': { transform: 'translateX(-30px)' },
                    '80%': { transform: 'translateX(30px)' },
                    '100%': { transform: 'translateX(0px)' },
                },
                noticeSlideRight: {
                    '0%': { transform: 'translateX(0px)' },
                    '40%': { transform: 'translateX(-30px)' },
                    '60%': { transform: 'translateX(-30px)' },
                    '100%': { transform: 'translateX(calc(100% + 30px))' },
                },
                noticeSlideTime: {
                    '0%': { width: '100%' },
                    '100%': { width: '0%' },
                },
                menuMobiOn: {
                    '0%': { width: '0%' },
                    '100%': { width: '70%' },
                },
                menuMobiOff: {
                    '0%': { width: '70%' },
                    '100%': { width: '0%' },
                },
                commentCreateDown: {
                    '0%': { height: '0px' },
                    '100%': { height: '210px' },
                },
                commentCreateUp: {
                    '0%': { height: '210px' },
                    '100%': { height: '0px' },
                },
            },
            animation: {
                polish: 'polish 0.8s linear infinite',
                vibrate: 'vibrate 1s linear infinite',
                vibrate2: 'vibrate2 1s linear infinite',
                slideOpenModalBook: 'slideOpenModalBook .1s linear',
                downSlide: 'downSlide .2s ease-in-out forwards',
                upSlide: 'upSlide .2s ease-in-out forwards',
                downSlide1: 'downSlide1 .2s ease-in-out forwards',
                upSlide1: 'upSlide1 .2s ease-in-out forwards',
                downSlide2: 'downSlide2 .2s ease-in-out forwards',
                upSlide2: 'upSlide2 .2s ease-in-out forwards',
                loading: 'loading .8s linear infinite',
                noticeSlideLeft: 'noticeSlideLeft .6s linear forwards',
                noticeSlideRight: 'noticeSlideRight .6s linear forwards',
                noticeSlideTime: 'noticeSlideTime 10s linear forwards',
                menuMobiOn: 'menuMobiOn .2s linear forwards',
                menuMobiOff: 'menuMobiOff .2s linear forwards',
                commentCreateDown: 'commentCreateDown .2s linear forwards',
                commentCreateUp: 'commentCreateUp .2s linear forwards',
            },
        },
    },
    plugins: [],
};
