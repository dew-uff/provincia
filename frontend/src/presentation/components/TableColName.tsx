function TableColName({ children }: { children: React.ReactNode }){
    return(
        <th className="text-left px-3 py-3 text-gray-500 font-semibold text-sm border-b-2 border-gray-200">{children}</th>
    );
}

export default TableColName;