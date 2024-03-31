import { BarList } from "@/components/dashboards/Barlist"


const data = [
    { name: "/PDF", value: 586 },
    { name: "/DOCX", value: 46 },
    { name: "/Videos", value: 3 },
    { name: "/Images", value: 108 },
    { name: "/Xls", value: 384 },
]

export const BarListdashboard = () => {

    return (
        <>

            <BarList
                data={data}

            />
        </>
    )
}