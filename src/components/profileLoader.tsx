interface ProfileLoaderProps {
    profile:any
}
 
const ProfileLoader: React.FunctionComponent<ProfileLoaderProps> = ({profile}) => {
    return (
        <div className={`Tooltip-Tip ${profile?"Tool-Tip-profile":""} border shadow rounded-md p-4 max-w-sm w-full mx-auto`} style={{width:"400px", height:"auto", background:"#f8f8f8"}}>
        <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
            </div>
            </div>
        </div>
        </div>
    );
}
 
export default ProfileLoader;