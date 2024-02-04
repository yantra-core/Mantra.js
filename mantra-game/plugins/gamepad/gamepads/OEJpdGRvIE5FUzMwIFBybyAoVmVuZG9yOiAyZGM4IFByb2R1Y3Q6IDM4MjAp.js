// Sony PLAYSTATION(R)3 Controller
export const controllerConfig = {
    buttons : {
        'BUTTON_A' : 0,
        'BUTTON_B' : 1,
        'BUTTON_X' : 3,
        'BUTTON_Y' : 4,
        'BUTTON_L1': 6,
        'BUTTON_R1': 7,
        'BUTTON_L2': 8,
        'BUTTON_R2': 9,
        'BUTTON_SELECT':10,
        'BUTTON_START':11,
        'BUTTON_STICK_L' : 13,
        'BUTTON_STICK_R' :14,
    },
    axes : {
        'LEFT_STICK_HORIZONTAL' : 0,
        'LEFT_STICK_VERTICAL' : 1,
        'RIGHT_STICK_HORIZONTAL' : 2,
        'RIGHT_STICK_VERTICAL' : 5,
        //the DPAD on 8bitdo NES30 is mismapped, couple to the analog sticks
        'DPAD_HORIZONTAL' : 0,//4,
        'DPAD_VERTICAL' : 1, //9,
    }
};

export default controllerConfig;