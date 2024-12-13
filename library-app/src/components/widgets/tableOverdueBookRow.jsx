import TableCell from '../elements/tableCell';

const TableOverdueBookRow = ({ overdueBook}) => (
    <tr>
        <TableCell>{overdueBook.bookTitle}</TableCell>
        <TableCell>{overdueBook.member}</TableCell>
        <TableCell>{`${overdueBook.overdueDays} days`}</TableCell>
    </tr>
);

export default TableOverdueBookRow;