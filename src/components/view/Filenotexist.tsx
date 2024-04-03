import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function Filenotexist() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Sorry</CardTitle>
                <CardDescription>
                    The file you are looking for has being removed or deleted by the owner !
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="items-center justify-center">
                    {/* <Image alt="not-found" height={200} width={100} src={"/hikkoshi2_l.png"} quality={100} /> */}
                </div>
                <div className="grid gap-4">
                    <div className=" gap-2 flex items-center justify-center">
                        <Image alt="not-found" height={600} width={300} src={"/hikkoshi2_l.png"} quality={100} />
                    </div>
                    {/* <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div> */}
                    <Link href="/">
                        <Button type="submit" className="w-full">
                            Go to Homepage ...
                        </Button>
                    </Link>

                    <Link href={"/dashboard"}>
                        <Button variant="outline" className="w-full">
                            Login ...
                        </Button>
                    </Link>

                </div>
                {/* <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline">
                        Sign up
                    </Link>
                </div> */}
            </CardContent>
        </Card>
    )
}
