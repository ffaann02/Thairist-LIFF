import { Link } from "react-router-dom"
import { MdArrowBackIosNew } from "react-icons/md";

const TitleBack = ({ title, backUrl }) => {
    return (
        <div className="w-full p-4 flex text-2xl font-bold text-slate-600">
            <Link to={backUrl}>
                <MdArrowBackIosNew className="mt-1 mr-2" />
            </Link>
            <p>{title}</p>
        </div>
    )
}
export default TitleBack