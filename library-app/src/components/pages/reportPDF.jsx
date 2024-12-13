import axios from "axios";
import { useState } from "react";

const BookReport = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filename, setFileName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState('');

    const handleGenerateReport = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await axios.get('http://localhost:5016/Book/report', {
                headers: { "Content-Type": 'application/pdf' },
                responseType: 'blob',
            });
            const contentDisposition = response.headers['content-disposition'];
            let tempfilename = 'BookReport.pdf';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    tempfilename = filenameMatch[1].replace(/['"]/g, '');
                    setFileName(tempfilename);
                }
            }

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfUrl);
        } catch (err) {
            setError('Gagal menghasilkan laporan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (pdfFile) {
            const link = document.createElement('a');
            link.href = pdfFile;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    };

    const handleBack = () => {
        if(pdfFile) {
            setPdfFile(null);
        setError(null);
        setIsLoading(false);

        }
        
        setReport('');
    };

    const handleGenerateReportSearch = async () => {
        setIsLoading(true);
        setError(null);
        setPdfFile(null);

        try {
            const response = await axios.get('http://localhost:5016/Borrowing/report/books/search_criteria', {
                headers: { "Content-Type": 'application/pdf' },
                params: { startDate, endDate },
                responseType: 'blob',
            });
            const contentDisposition = response.headers['content-disposition'];
            let tempfilename = 'BookReport.pdf';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    tempfilename = filenameMatch[1].replace(/['"]/g, '');
                    setFileName(tempfilename);
                }
            }

            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfFile(pdfUrl);
        } catch (err) {
            setError('Gagal menghasilkan laporan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    if (report === "Laporan Buku Keluar") {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Laporan Buku Keluar</h4>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center mb-4">
                    <button className="btn btn-primary me-2" onClick={handleGenerateReport} disabled={isLoading}>
                        {isLoading ? 'Menghasilkan Laporan...' : 'Lihat Laporan'}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>Unduh PDF</button>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={handleBack}>Kembali</button>
                </div>

                {pdfFile && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe src={pdfFile} width="100%" height="500" className="embed-responsive-item" title="PDF Preview">
                            Browser Anda tidak mendukung tampilan PDF.
                        </iframe>
                    </div>
                )}
            </div>
        );
    } else if (report === "Laporan Peminjaman Buku dengan Periode Waktu") {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Laporan Peminjaman Buku dengan Periode Waktu</h4>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">Tanggal Mulai:</label>
                        <input type="date" id="startDate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">Tanggal Akhir:</label>
                        <input type="date" id="endDate" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="text-center mb-4">
                    <button className="btn btn-primary me-2" onClick={handleGenerateReportSearch} disabled={isLoading}>
                        {isLoading ? 'Menghasilkan Laporan...' : 'Lihat Laporan'}
                    </button>
                    {pdfFile && (
                        <button className="btn btn-success" onClick={handleDownloadPDF}>Unduh PDF</button>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={handleBack}>Kembali</button>
                </div>

                {pdfFile && (
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe src={pdfFile} width="100%" height="500" className="embed-responsive-item" title="PDF Preview">
                            Browser Anda tidak mendukung tampilan PDF.
                        </iframe>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="container py-4">
                <h4 className="mb-4 text-center">Pilih Jenis Laporan</h4>
                <select className="form-select" value={report} onChange={(e) => setReport(e.target.value)}>
                    <option value="">Silakan pilih laporan</option>
                    <option value="Laporan Buku Keluar">Laporan Buku Keluar</option>
                    <option value="Laporan Peminjaman Buku dengan Periode Waktu">Laporan Peminjaman Buku dengan Periode Waktu</option>
                </select>
            </div>
        );
    }
};

export default BookReport;