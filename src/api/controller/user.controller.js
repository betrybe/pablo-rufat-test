import { UserService } from "../services";

export const signUp = async (req, res, next) => {

    const payload = req.body;

    if (
        !validateField(payload.name) ||
        !validateField(payload.email) ||
        !validateField(paylolad.password) ||
        !validateEmail(payload.email)
    ) {
        return res.status(400).json({ message: "Invalid entries. Try again." });
    }

    try {
        const response = await UserService.signUp(payload);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
};

export const signUpAdmin = async (req, res, next) => {
    return res.status(201).json({});
};

export const signIn = async (req, res, next) => {
    return res.status(200).json({});
};

const validateField = (field) => {
    return field && typeof field === "string" && field.trim() !== "";
}

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}