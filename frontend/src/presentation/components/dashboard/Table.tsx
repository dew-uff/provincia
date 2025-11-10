import TableRow from './TableRow';
import TableColName from './TableColName';
import type { ColumnConfig, RowData } from '../../../shared/types/table';

interface TableProps {
    colNames?: string[];
    columns: ColumnConfig[];
    data?: RowData[];
}

function Table({ colNames = [''], columns, data = [] }: TableProps) {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    {colNames.map((name, i) => (
                        <TableColName key={i}>{name}</TableColName>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <TableRow
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