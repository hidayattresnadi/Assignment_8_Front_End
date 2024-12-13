import Container from '../elements/container';
import TableHeader from '../widgets/tableHeader';
import TableOverdueBookRow from '../widgets/tableOverdueBookRow';


const TableOverdueBooks = ({ overdueBooks, columns }) => {
    
    return (
        <div style={{ height: '450px', padding:0 }} className='card mt-auto bg-white'>
            <Container className="container-fluid card-header text-start">
                    <h1 className="mb-0">Overdue Books</h1>
            </Container>
            <Container className={'mt-3'}>
            <table className="table text-start">
                <TableHeader className={'table'} columns={columns} />
                <tbody>
                    {overdueBooks.map((overdueBook, index) => (
                        <TableOverdueBookRow
                            key={index}
                            overdueBook={overdueBook}
                        />
                    ))}
                </tbody>
            </table>

            </Container>
            
        </div>

    )

};

export default TableOverdueBooks;
