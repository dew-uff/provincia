import type { ColumnConfig, RowData } from '../../../shared/types/table';

interface TableRowProps<T extends RowData = RowData> {
    data: T;
    columns: ColumnConfig[];
}

function TableRow<T extends RowData = RowData>({ data, columns }: TableRowProps<T>) {
    const renderCell = (column: ColumnConfig) => {
        const value = data[column.key];

        if (column.type === 'status') {
            const statusValue = String(value).toLowerCase();

            if (statusValue === 'alerta') {
                return (
                    <td key={column.key} className="py-4 px-3 border-b border-gray-100 text-amber-500 font-medium">
                        ⚠ Alerta
                    </td>
                );
            }

            if (statusValue === 'erro') {
                return (
                    <td key={column.key} className="py-4 px-3 border-b border-gray-100 text-red-500 font-medium">
                        ✗ Erro
                    </td>
                );
            }

            return (
                <td key={column.key} className="py-4 px-3 border-b border-gray-100 text-green-500 font-medium">
                    ✓ OK
                </td>
            );
        }

        if (column.type === 'actions') {
            return (
                <td key={column.key} className="py-4 px-3 border-b border-gray-100">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Ver detalhes
                    </button>
                </td>
            );
        }

        return (
            <td key={column.key} className="py-4 px-3 border-b border-gray-100 text-gray-800">
                {String(value)}
            </td>
        );
    };

    return (
        <tr>
            {columns.map(column => renderCell(column))}
        </tr>
    );
}

export default TableRow;