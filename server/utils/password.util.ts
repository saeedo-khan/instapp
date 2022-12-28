import bcrypt from 'bcryptjs'


// check if plain and hashed password same 
export const checkPassword = async (password: string, passwordHash: string) => {
    try {
        const matchPassword = await bcrypt.compare(password, passwordHash);
    return matchPassword;
    } catch (error) {
        console.error(error);
    }
    
}

// hash plain password 
export const hashPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, 12);
    return hashed;
}