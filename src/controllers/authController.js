import UserRepository from "../repositories/UserRepository.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {

    
    console.log('Cuerpo de la petición:', req.body);
    const { email, password } = req.body;

    try {
        const user = await UserRepository.getByEmail(email); // Asegúrate de tener un método getByEmail en UserRepository
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        res.json({ message: "Login successful", token, email:user.email, userID: user._id });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};
