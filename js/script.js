/* ===================================================
   StatVision - Main Interactive Script
   =================================================== */

document.addEventListener("DOMContentLoaded", function () {
  console.log("StatVision Interactive Platform Loaded Successfully.");

  // التمرير السلس للروابط الداخلية
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
