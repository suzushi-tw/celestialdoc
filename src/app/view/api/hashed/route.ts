import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        const body = await req.json();
        let { enteredPassword, fileId } = body;
        console.log(enteredPassword + "" + fileId + "starting compare")
        try {
            const sent = await prisma.send.findFirst({
                where: {
                    id: fileId
                }
            })

            if (!sent) {
                return Response.json({ error: 'Missing  information' });
            }

            console.log("Hashed password from database:", sent.password);
            const isMatch = await bcrypt.compare(enteredPassword, sent.password);
            console.log("Comparison result:", isMatch);

            if (isMatch) {
                return Response.json({ ispasswordcorrect: true });
            } else {
                return Response.json({ ispasswordcorrect: false })
            }



        } catch (error) {
            return Response.json({ error });
        }
    } else {
        return Response.json({ error: 'Missing  information' });
    }
}
