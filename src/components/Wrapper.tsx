export default function Wrapper({children} : {children: React.ReactNode}){
    return (
        <div className="bg-[url('https://picsum.photos/1280/760')] min-h-screen bg-no-repeat bg-center bg-cover grid items-center justify-center text-white">
            {children}
            <div className='fixed bottom-1 left-1'>
                <img src="src/assets/images/logo.png" alt="Logo" className='w-10' />
            </div>
        </div>
    ); 
}