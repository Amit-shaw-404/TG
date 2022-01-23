interface NotFoundProps {
    profile:boolean
}
 
const NotFound: React.FunctionComponent<NotFoundProps> = ({profile}) => {
    return (
        <div className="w-full h-screen bg-gray-50 flex flex-col space-y-5 justify-center items-center">
            <p className="text-5xl text-gray-500">404</p>
            <p className="text-base text-gray-500">The {profile?"user":"page"} you are looking for does not exist!!!</p>
        </div>
    );
}
 
export default NotFound;