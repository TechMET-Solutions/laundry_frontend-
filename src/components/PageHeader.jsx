import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PageHeader = ({
    title,
    actions = null, // 👈 NEW (buttons go here)
}) => {
    const navigate = useNavigate();



    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <div
                        className="h-8 w-8 flex items-center justify-center
                       bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <IoReturnUpBackOutline />
                    </div>

                    <h2 className="font-semibold text-lg">
                        {title}
                    </h2>
                </div>

                {/* Right */}
                <div className="flex items-end gap-2">
                    {actions && (
                        <div className="flex gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
