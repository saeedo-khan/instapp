import ctypto from "crypto";

const randomHash = (str: string) => {
    return ctypto.createHash("md5").update(str).digest("hex");
};


export const generateRandomImage = ({ str, type = "identicon", size = 200}: {str: string, type?: string, size?: number}) => {
    const md5Hash = randomHash(str);
    return `https:/www.gravatar.com/avatar/${md5Hash}?d=${type}&s=${size}`;
}