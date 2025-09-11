  document.getElementById("downloadPDF").addEventListener("click", function (e) {
      e.preventDefault(); // يمنع فتح لينك فاضي

      // حدد العنصر اللي هيتحول PDF (الصفحة كلها)
      const element = document.body;

      // إعدادات التحويل
      const opt = {
        margin:       0.5,
        filename:     'page.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      // تحويل وتحميل
      html2pdf().set(opt).from(element).save();
    });