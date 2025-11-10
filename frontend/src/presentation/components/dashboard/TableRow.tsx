import type { ColumnConfig, RowData } from '../../../shared/types/table';

interface TableRowProps {
    data: RowData;
    columns: ColumnConfig[];
}

function TableRow({ data, columns }: TableRowProps) {
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

            return (
                <td key={column.key} className="py-4 px-3 border-b border-gray-100 text-green-500 font-medium">
                    ✓ OK
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