const TableHeader = ({ columns, className }) => (
    <thead className={className? className : 'table-dark'}>
        <tr>
            {columns.map((col, index) => (
                <th key={index}>{col}</th>
            ))}
        </tr>
    </thead>
);

export default TableHeader;

