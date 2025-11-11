import TableRow from './TableRow';
import TableColName from './TableColName';
import type { ColumnConfig, RowData } from '../../shared/types/table';

interface TableProps<T extends RowData = RowData> {
    colNames?: string[];
    columns: ColumnConfig[];
    data?: T[];
}

function Table<T extends RowData = RowData>({ colNames = [''], columns, data = [] }: TableProps<T>) {
    return (
        <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-50 px-5 py-4 text-left text-[13px] font-semibold text-gray-500 uppercase tracking-wide border-b-2 border-gray-200">
                <tr>
                    {colNames.map((name, i) => (
                        <TableColName key={i}>{name}</TableColName>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <TableRow<T>
                        key={i}
                        data={row}
                        columns={columns}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default Table;