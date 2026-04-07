
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // يمنع الفورم من الريلود

    let name = document.getElementById("name").value;
    let numpebr = document.getElementById("number").value;
    let message = document.getElementById("message").value;

    let phoneNumber = "201107175122"; // حط رقمك بدون + 

    let text = `رسالة جديدة من الموقع:%0Aالاسم: ${name}%0Aالرسالة: ${message} : رقم هاتفه ${numpebr}`;

    let whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");
});
