import Link from "./Link";

export default function Links(){
    return (
        <div className="flex items-center text-sm font-light space-x-4">
            <Link to="youtube" />
            <Link to="whatsapp" />
            <Link to="x" />
            <Link to="gmail" />
        </div>
    ); 
}