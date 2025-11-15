interface LoaderProps {
    message?: string;
    className?: string;
}

function Loader({ message = 'Carregando...', className = '' }: LoaderProps) {
    return (
        <main className={`flex flex-col items-center justify-center w-full min-h-screen ${className}`}>
            <div className='flex flex-col items-center gap-4'>
                {/* Spinner animado */}
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                </div>

                {/* Mensagem com animação de pulso */}
                <p className="text-gray-600 text-base font-medium animate-pulse">{message}</p>
            </div>
        </main>
    );
}

export default Loader;
