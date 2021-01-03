import { useState } from "react"


export const useHttp = () => {
    const [loading, setloading] = useState(false);
    const req = () => {

    }
    return { loading, setloading }
}
