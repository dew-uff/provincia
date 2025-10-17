function MetricsCard({ numbers, indicator }: { numbers: string; indicator: string }) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 flex flex-col gap-2 flex-[0_0_180px]'>
        <h2 className="text-3xl font-bold text-[#1F2937]">{numbers}</h2>
        <p className="">{indicator}</p>
    </div>
  );
}

export default MetricsCard;