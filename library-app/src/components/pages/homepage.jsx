import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import BookService from '../../services/bookService';
import BarCart from '../modules/barCart';
import DashboardService from '../../services/dashboardService';
import PieCart from '../modules/pieCart';
import LineCart from '../modules/lineCart';
import AreaCart from '../modules/areaCart';
import TableOverdueBooks from '../modules/tableOverdueBooks';
import TableBookRequests from '../modules/tableBookRequest';

function HomePage({ members, setMembers }) {
    const [ErrorStatus, setErrorStatus] = useState();
    const [loading, setLoading] = useState(true);
    const [totalBooks, setTotalBooks] = useState();
    const [dashboardInfo, setDashboardInfo] = useState();
    const columnsTableOverdueBooks = ["Title", "Member", "Days Overdue"];
    const columns = ["Process Id", "Request Date", "Requester", "Book Title", "Author", "Publisher", "ISBN", "Status", "Detail"]

    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await BookService.getAll();
                setTotalBooks(response.data.totalCount);

                let dashboardResponse = await DashboardService.getAll();
                console.log(dashboardResponse.data)
                console.log(dashboardResponse.data.processesCurentUser)
                setDashboardInfo(dashboardResponse.data)
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [setTotalBooks, ErrorStatus])

    useEffect(() => {
        const myFetch = async () => {
            try {
                // let response = await axios.get(`http://localhost:5184/User`);
                // setMembers(response.data);
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [setMembers, ErrorStatus])

    return (
        <>
            {loading ? <LoadingSpinner /> :
                ErrorStatus ? <Container><h1>Terjadi Gangguan...</h1></Container> :
                    <Container className="dashboard-container">
                        <h1 className="text-center">Library Dashboard</h1>
                        <Container className="dashboard-grid mb-5">
                            <Container className="card bg-primary" >
                                <Icon className="fas fa-book fa-2x text-white"></Icon>
                                <h2 className='text-white'>Total Books</h2>
                                <Text className='text-white'>{totalBooks}</Text>
                            </Container>


                            <Container className="card bg-warning">
                                <Icon className="text-white fas fa-sharp-duotone fa-2x fa-thin fa-clipboard-list"></Icon>
                                <h2 className='text-white'>Total Proocess to Follow up</h2>
                                <Text className='text-white'>{dashboardInfo.processesCurentUser.length}</Text>
                            </Container>

                            <Container className="card bg-danger">
                                <Icon className="fas fa-clock text-white fa-2x"></Icon>
                                <h2 className='text-white'>Total Overdue Books</h2>
                                <Text className='text-white'>{dashboardInfo.overdueBooks.length}</Text>
                            </Container>

                        </Container>

                        <Container className={"container-fluid row"}>
                            <Container className="col-4">
                                <BarCart dashboardInfo={dashboardInfo} />
                            </Container>

                            <Container className={"col-4"}>
                                <PieCart dashboardInfo={dashboardInfo} />
                            </Container>

                            <Container className={"col-4 table-responsive"}>
                                <TableOverdueBooks columns={columnsTableOverdueBooks} overdueBooks={dashboardInfo.overdueBooks} />
                            </Container>

                            <Container className="table-responsive mt-5 card" style={{ padding: 0 }}>
                                <Container className="container-fluid card-header text-start mb-4">
                                    <h4 className="mb-0">Follow Up Tasks By Users</h4>
                                </Container>
                                <h1 className="text-start mt-3 mb-4 ms-3">Book Request List</h1>
                                <TableBookRequests columns={columns} bookRequests={dashboardInfo.processesCurentUser} />
                            </Container>
                        </Container>
                        {/* <Container className="mt-5">
                            <LineCart dashboardInfo={dashboardInfo} />
                        </Container>

                        <Container className="mt-5">
                            <AreaCart dashboardInfo={dashboardInfo} />
                        </Container> */}
                    </Container>

            }
        </>
    )
}

export default HomePage;