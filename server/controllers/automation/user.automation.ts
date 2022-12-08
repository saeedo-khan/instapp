import { db } from "../../utils/db";
import { generateRandomImage } from "../../utils/generateImage";
import { hashPassword } from "../../utils/password.util";


export const createUsers = async (total: number) => {
    try {
        Array.from(Array(total).keys()).forEach(async (loop) => {



            const password = await hashPassword("123456");
            const email = `test${loop}@gmail.com`;
            const user = await db.user.create({
                data: {
                    email,
                    name: `Test${loop}`,
                    gender: "MALE",
                    password,
                    profile_pic_url: generateRandomImage({ str: email }),                    
                },
            })
            console.log(`${user.name} created successfully`)
        });

    } catch (error) {
        console.log(error);
    }
}


async function removeAllusers() {
    try {
        await db.user.deleteMany({})
        console.log("All users deleted")
    } catch (error) {
        console.log(error);
    }
}


async function main(){
    // removeAllusers()
    createUsers(10);
}

main();