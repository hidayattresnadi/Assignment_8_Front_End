import {
    PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import Container from '../elements/container';

const PieCart = ({ dashboardInfo }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <div style={{ height: '450px', padding:0 }} className='card mt-auto'>
            <Container className="container-fluid card-header text-start">
                    <h1 className="mb-0">Books by Category</h1>
            </Container>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={dashboardInfo.booksPerCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ categoryName, percent }) => `${categoryName} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120} 
                        fill="#8884d8" 
                        dataKey="numberOfBooks"
                    >
                        {dashboardInfo.booksPerCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                     formatter={(value, entry) => {
                        const { categoryName, numberOfBooks } = entry.payload; // Mengambil categoryName dari data payload
                        return `${categoryName} (${numberOfBooks} books)`;
                    }} 
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieCart;
