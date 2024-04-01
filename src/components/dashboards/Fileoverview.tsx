import { BarList } from "@/components/dashboards/Barlist"
import { trpc } from '@/app/_trpc/client'

const data = [
    { name: "/PDF", value: 586 },
    { name: "/DOCX", value: 46 },
    { name: "/Videos", value: 3 },
    { name: "/Images", value: 108 },
    { name: "/Xls", value: 384 },
]

export const BarListdashboard = () => {

    const { data, error, isLoading } = trpc.filescount.useQuery();
    const formattedData = data?.map(item => ({ name: item.type, value: item.count })) || [];
    return (
        <>

            <BarList
                data={formattedData}

            />
        </>
    )
}