import {BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell}
    from 'recharts';
import Container from '../elements/container';

const BarCart = ({dashboardInfo}) => {
    const activeMembers = [

        { name: 'John Doe', borrowCount: 15 },
    
        { name: 'Jane Smith', borrowCount: 12 },
    
        { name: 'Bob Johnson', borrowCount: 10 },
    
        { name: 'Alice Brown', borrowCount: 9 },

        { name: 'Harry Potter', borrowCount: 15 },
    
        { name: 'Hermione', borrowCount: 12 },
    
        { name: 'Bob Marley', borrowCount: 10 },
    
        { name: 'Marcellino', borrowCount: 9 },
        { name: 'Henry Ford', borrowCount: 20 },
    
        { name: 'Grace Lee', borrowCount: 18 },
    
    ]

    return (
        <div style={{ height: '450px', padding:0 }} className='card'>
            <Container className="container-fluid card-header text-start">
                    <h1 className="mb-0">Most Active Members</h1>
            </Container>

            {/* <ResponsiveContainer width="100%" height="100%">

                <BarChart data={dashboardInfo.mostActiveMembers} layout="vertical">

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis dataKey="name" type="category" width={100} />

                    <Tooltip />

                    <Bar dataKey="borrowedCount" fill="#0d6efd" />

                </BarChart>

            </ResponsiveContainer> */}


            <ResponsiveContainer className={"mt-4"} width="90%" height="80%">

                <BarChart data={activeMembers} layout="vertical">

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis type="number" />

                    <YAxis dataKey="name" type="category" width={100} />

                    <Tooltip />

                    <Bar dataKey="borrowCount" fill="#0d6efd" />

                </BarChart>

            </ResponsiveContainer>
        </div>


    );
};

export default BarCart;