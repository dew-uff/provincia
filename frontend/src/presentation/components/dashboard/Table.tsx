import TableRow from './TableRow';
import TableColName from './TableColName';

function Table ({colNames = [''], dataFlows = []} : {colNames?: string[], dataFlows?: Array<{name: string, user: string, lastExecution: string, status: string}>}) {
    return(
        <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {colNames.map((name, i) => (
                            <TableColName key={i}>{name}</TableColName>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataFlows.map((flow, i) => (
                        <TableRow 
                            key={i}                            
                            name={flow.name}
                            user={flow.user}
                            lastExecution={flow.lastExecution}
                            status={flow.status}
                        />
                    ))}
                </tbody>
        </table>
    );
}

export default Table;