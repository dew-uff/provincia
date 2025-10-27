function TableRow({ name, user, lastExecution, status }: { name: string; user: string; lastExecution: string; status: string }) {
    return(
        <tr>
            <td className="py-4 px-3 border-b border-gray-100 text-gray-800">{name}</td>
            <td className="py-4 px-3 border-b border-gray-100 text-gray-800">{user}</td>
            <td className="py-4 px-3 border-b border-gray-100 text-gray-800">{lastExecution}</td>
            {status == "alerta" ? <td className="py-4 px-3 border-b border-gray-100 text-amber-500 font-medium">⚠ Alerta</td> : 
                <td className="py-4 px-3 border-b border-gray-100 text-green-500 font-medium">✓ OK</td> }
        </tr>
    )
}

export default TableRow;