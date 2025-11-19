import PageTitle from '../components/PageTitle';
function Search() {
  return (
       <main className='flex flex-col items-center p-6 w-full h-full'>
            <div className='container w-full max-w-[900px] flex flex-row align-middle justify-between mb-4'>
                <PageTitle title="Consulta" />
            </div>
        </main> 
);
}

export default Search;