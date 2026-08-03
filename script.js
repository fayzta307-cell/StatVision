/* ==========================================================================
   StatVision - Main JavaScript Logic
   Includes: Scroll Progress, Chart Engine, Dynamic Visual Modals, Prompt Copying
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initBackToTop();
    initAOS();
    initCharts();
    initDailyFact();
});

// Scroll Progress Bar Logic
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) progressBar.style.width = scrolled + '%';
    });
}

// Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
}

// Chart.js Rendering Engine for Page 1 & 2
function initCharts() {
    // 1. Histogram Chart
    const ctxHist = document.getElementById('histogramChart');
    if (ctxHist) {
        window.histChartObj = new Chart(ctxHist, {
            type: 'bar',
            data: {
                labels: ['50-59', '60-69', '70-79', '80-89', '90-99'],
                datasets: [{
                    label: 'عدد الطلاب',
                    data: [4, 8, 15, 10, 5],
                    backgroundColor: '#2563EB',
                    borderRadius: 4,
                    barPercentage: 1.0,
                    categoryPercentage: 1.0
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { title: { display: true, text: 'فئات الدرجات' } },
                    y: { title: { display: true, text: 'التكرار' } }
                }
            }
        });
    }

    // 2. Bar Chart
    const ctxBar = document.getElementById('barChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['جدة', 'الرياض', 'الدمام'],
                datasets: [{
                    label: 'عدد الموظفين',
                    data: [120, 200, 85],
                    backgroundColor: ['#2563EB', '#06B6D4', '#10B981']
                }]
            },
            options: { responsive: true }
        });
    }

    // 3. Pie Chart
    const ctxPie = document.getElementById('pieChart');
    if (ctxPie) {
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['القهوة السوداء', 'الشاي', 'الماتشا'],
                datasets: [{
                    data: [55, 30, 15],
                    backgroundColor: ['#7c2d12', '#dc2626', '#16a34a']
                }]
            },
            options: { responsive: true }
        });
    }

    // 4. Line Chart
    const ctxLine = document.getElementById('lineChart');
    if (ctxLine) {
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'عدد الزوار',
                    data: [1200, 1900, 3000, 2500, 3200, 4500],
                    borderColor: '#06B6D4',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: { responsive: true }
        });
    }

    // 5. Scatter Plot
    const ctxScatter = document.getElementById('scatterChart');
    if (ctxScatter) {
        window.scatterChartObj = new Chart(ctxScatter, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'ساعات المذاكرة مقابل الدرجات',
                    data: [
                        { x: 2, y: 60 }, { x: 3, y: 65 }, { x: 5, y: 75 },
                        { x: 7, y: 88 }, { x: 9, y: 95 }, { x: 4, y: 70 }
                    ],
                    backgroundColor: '#2563EB'
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'ساعات المذاكرة' } },
                    y: { title: { display: true, text: 'الدرجة' } }
                }
            }
        });
    }
}

// Interactive Histogram Bins Slider Logic
function updateHistogramBins(value) {
    if (!window.histChartObj) return;
    document.getElementById('binValue').innerText = value;
    
    // Dynamically adjust bin distribution simulating data re-binning
    let newLabels = [];
    let newData = [];
    if(value == 3) {
        newLabels = ['50-65', '66-80', '81-100'];
        newData = [10, 20, 12];
    } else if(value == 5) {
        newLabels = ['50-59', '60-69', '70-79', '80-89', '90-99'];
        newData = [4, 8, 15, 10, 5];
    } else {
        newLabels = ['50-55', '56-62', '63-70', '71-78', '79-85', '86-92', '93-100'];
        newData = [2, 3, 6, 10, 11, 6, 4];
    }
    
    window.histChartObj.data.labels = newLabels;
    window.histChartObj.data.datasets[0].data = newData;
    window.histChartObj.update();
}

// Scatter Trendline Toggle Logic
function toggleTrendline() {
    if (!window.scatterChartObj) return;
    const ds = window.scatterChartObj.data.datasets;
    if (ds.length > 1) {
        ds.pop(); // Remove trendline
    } else {
        ds.push({
            type: 'line',
            label: 'خط الاتجاه',
            data: [{ x: 2, y: 58 }, { x: 9, y: 96 }],
            borderColor: '#EF4444',
            borderWidth: 2,
            pointRadius: 0,
            fill: false
        });
    }
    window.scatterChartObj.update();
}

// Software Card Details Modal Opener
function showSoftwareModal(title, text, uses, aiHelp, example) {
    document.getElementById('swModalTitle').innerText = title;
    document.getElementById('swModalBody').innerHTML = `
        <h6><i class="fas fa-info-circle text-primary"></i> نبذة عن البرنامج:</h6>
        <p>${text}</p>
        <h6><i class="fas fa-tasks text-info"></i> أهم الاستخدامات:</h6>
        <p>${uses}</p>
        <h6><i class="fas fa-robot text-success"></i> دور الذكاء الاصطناعي:</h6>
        <p>${aiHelp}</p>
        <div class="quote-box mt-3">
            <small class="fw-bold"><i class="fas fa-lightbulb"></i> مثال عملي:</small><br>"${example}"
        </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById('softwareModal'));
    modal.show();
}

// Clipboard Copy Logic for Prompt Lab
function copyPrompt(button) {
    const card = button.closest('.prompt-card');
    const text = card.querySelector('.prompt-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const origText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        button.classList.replace('btn-outline-light', 'btn-success');
        setTimeout(() => {
            button.innerHTML = origText;
            button.classList.replace('btn-success', 'btn-outline-light');
        }, 2000);
    });
}

// Daily Stat Fact Generator for Page 3
function initDailyFact() {
    const facts = [
        "يُقدَّر أن أكثر من 90% من البيانات الموجودة في العالم أُنشئت خلال السنوات الأخيرة.",
        "يعتمد معظم نماذج الذكاء الاصطناعي الحديثة على مبادئ إحصائية في التدريب والتنبؤ.",
        "تُستخدم الإحصاءات يوميًا في الطب والاقتصاد والرياضة والتسويق وصناعة القرار."
    ];
    const factElement = document.getElementById('dailyFactText');
    if (factElement) {
        const randomIndex = Math.floor(Math.random() * facts.length);
        factElement.innerText = facts[randomIndex];
    }
}
