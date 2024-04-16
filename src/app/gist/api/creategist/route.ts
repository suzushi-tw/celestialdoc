import prisma from "@/lib/prisma";


export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {


        console.log("getting download url")
        const body = await req.json();
        let { filename, language, text } = body;


        try {

            const Gist = await prisma.gist.create({
                data: {
                    name: filename,
                    language: language,
                    text: text,
                },
            })
            const gisturl = process.env.NEXT_PUBLIC_BASE_URL + "/gist/" + Gist.id
            return Response.json({ success: true, url: gisturl });
        } catch (error) {
            return Response.json({ error });
        }
    } else {
        return Response.json({ error: 'Missing user information' });
    }
}
