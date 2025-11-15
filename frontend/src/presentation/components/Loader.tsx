interface LoaderProps {
    message?: string;
    className?: string;
}

function Loader({ message = 'Carregando...', className = '' }: LoaderProps) {
    return (
        <main className={`flex flex-col items-center p-6 w-full h-full ${className}`}>
            <div className='container w-full max-w-[900px] flex flex-row align-middle justify-center'>
                <p>{message}</p>
            </div>
        </main>
    );
}

export default Loader;
