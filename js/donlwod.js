        function downloadPDF() {
    const element = document.body;
    const opt = {
        margin:       0,
        padding:      0,
        filename:     'page.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}