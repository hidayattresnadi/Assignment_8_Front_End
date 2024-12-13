import {
    BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
}
    from 'recharts';

const LineCart = ({ dashboardInfo }) => {
    const monthlyData = [
        { month: 'Jan', borrowed: 124, returned: 98, newMembers: 45 },
        { month: 'Feb', borrowed: 145, returned: 125, newMembers: 38 },
        { month: 'Mar', borrowed: 165, returned: 140, newMembers: 52 },
        { month: 'Apr', borrowed: 155, returned: 149, newMembers: 41 },
        { month: 'May', borrowed: 178, returned: 158, newMembers: 35 },
        { month: 'Jun', borrowed: 190, returned: 175, newMembers: 48 },
    ];


    return (

        <div style={{ height: '300px', marginTop: '150px' }}>
            <h1 className='text-center'>Line Cart</h1>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone"
                        dataKey="newMembers"
                        stroke="#198754"
                        name="New Members"
                    />

                    <Line type="monotone"
                        dataKey="borrowed"
                        stroke="red"
                        name="Borrowed"
                    />

                    <Line type="monotone"
                        dataKey="returned"
                        stroke="blue"
                        name="Retutned"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
};

export default LineCart;