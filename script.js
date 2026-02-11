const musicBtn = document.getElementById('music-btn'),
    confettiContainer = document.getElementById('confetti-container'),
    balloonsContainer = document.getElementById('balloons-container'),
    sparklesContainer = document.getElementById('sparkles-container'),
    birthdayPerson = document.getElementById('birthday-person'),
    personName = document.getElementById('person-name');

let isPlaying = false,
    audio = null;

// تشخیص موبایل
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

class SimpleMusicPlayer {
    constructor() {
        this.init()
    }

    init() {
        // پخش خودکار با تأخیر
        setTimeout(() => this.playMusic(), 500);
        
        this.setupEventListeners();
        this.createAnimations();
    }

    setupEventListeners() {
        musicBtn.addEventListener('click', () => this.toggleMusic());
        
        document.addEventListener('keydown', e => {
            if (e.code === 'Space' || e.code === 'KeyM') {
                e.preventDefault();
                this.toggleMusic();
            }
        });
    }

    async playMusic() {
        try {
            if (!audio) {
                audio = new Audio('audio/Miras - Tavalod (320).mp3');
                audio.loop = true;
                audio.volume = 0.7;
            }
            
            await audio.play();
            isPlaying = true;
            this.updateMusicButton();
            
        } catch (error) {
            console.log('پخش خودکار موفق نبود، منتظر کلیک کاربر...');
        }
    }

    pauseMusic() {
        if (audio) {
            audio.pause();
            isPlaying = false;
            this.updateMusicButton();
        }
    }

    toggleMusic() {
        if (isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    updateMusicButton() {
        const icon = isPlaying ? 'fa-pause' : 'fa-play';
        musicBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        
        // تغییر رنگ دکمه
        if (isPlaying) {
            musicBtn.style.background = 'linear-gradient(135deg, #ff6b8b, #ff9a8b)';
        } else {
            musicBtn.style.background = 'linear-gradient(135deg, #4a6fa5, #7eb3ff)';
        }
    }

    createAnimations() {
        // شروع با تعداد کم
        this.createBalloons(3);
        this.createConfetti(15);
        this.createSparkles(10);
        
        // ایجاد انیمیشن‌های متناوب با فاصله مناسب
        setInterval(() => this.createBalloons(1), 4000);
        setInterval(() => this.createConfetti(5), 3000);
        setInterval(() => this.createSparkles(3), 2000);
    }

    createBalloons(count) {
        const colors = ['#ff6b8b', '#ffd700', '#7eb3ff', '#a1c4fd'];
        
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // موقعیت از پایین صفحه
            balloon.style.left = `${10 + Math.random() * 80}%`;
            balloon.style.bottom = '-60px';
            
            // اندازه تصادفی
            const size = 40 + Math.random() * 30;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.2}px`;
            
            // رنگ
            const color = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${this.darkenColor(color, 20)})`;
            
            // انیمیشن
            const duration = 8 + Math.random() * 4;
            balloon.style.animation = `floatUp ${duration}s linear forwards`;
            
            // اضافه کردن رشته بادکنک
            const string = document.createElement('div');
            string.className = 'balloon-string';
            balloon.appendChild(string);
            
            balloonsContainer.appendChild(balloon);
            
            // حذف بعد از اتمام انیمیشن
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
            }, duration * 1000);
        }
    }

    createConfetti(count) {
        const colors = ['#ff6b8b', '#ffd700', '#7eb3ff', '#a1c4fd'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // موقعیت از بالای صفحه
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = '-20px';
            
            // اندازه
            const size = 8 + Math.random() * 12;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // رنگ و شکل
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.background = color;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // انیمیشن
            const duration = 3 + Math.random() * 3;
            confetti.style.animation = `confettiFall ${duration}s linear forwards`;
            
            confettiContainer.appendChild(confetti);
            
            // حذف بعد از اتمام
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, duration * 1000);
        }
    }

    createSparkles(count) {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // موقعیت تصادفی
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            
            // اندازه
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            
            // انیمیشن
            sparkle.style.animation = `sparkle ${1 + Math.random()}s ease-in-out infinite`;
            
            sparklesContainer.appendChild(sparkle);
            
            // حذف بعد از 3 ثانیه
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 3000);
        }
    }

    // تابع برای تیره کردن رنگ
    darkenColor(color, percent) {
        // تبدیل hex به RGB
        let r = parseInt(color.substr(1, 2), 16);
        let g = parseInt(color.substr(3, 2), 16);
        let b = parseInt(color.substr(5, 2), 16);
        
        // تیره کردن
        r = Math.floor(r * (100 - percent) / 100);
        g = Math.floor(g * (100 - percent) / 100);
        b = Math.floor(b * (100 - percent) / 100);
        
        // تبدیل به hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}

// اضافه کردن استایل‌های انیمیشن
const style = document.createElement('style');
style.textContent = `
    /* بادکنک */
    .balloon {
        position: fixed;
        border-radius: 50%;
        z-index: -1;
        pointer-events: none;
        transform-origin: bottom center;
    }
    
    .balloon-string {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 40px;
        background: rgba(0, 0, 0, 0.2);
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(15deg);
            opacity: 0;
        }
    }
    
    /* کانفتی */
    .confetti {
        position: fixed;
        z-index: -2;
        pointer-events: none;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* درخشش */
    .sparkle {
        position: fixed;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 8px white;
        z-index: -3;
        pointer-events: none;
    }
    
    @keyframes sparkle {
        0%, 100% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// شروع کار
document.addEventListener('DOMContentLoaded', () => {
    new SimpleMusicPlayer();
    
    // انیمیشن‌های تعاملی
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    // تابع تبدیل اعداد انگلیسی به فارسی
function toPersianNumbers(number) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return number.toString().replace(/\d/g, digit => persianDigits[digit]);
}

// تابع برای تبدیل تاریخ به فارسی
function updatePersianNumbers() {
    // اعداد درون متن
    document.querySelectorAll('body *:not(script):not(style)').forEach(element => {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            const text = element.textContent;
            const persianText = text.replace(/\d+/g, match => toPersianNumbers(match));
            if (text !== persianText) {
                element.textContent = persianText;
            }
        }
    });
    
    // سن در پروفایل
    const ageElement = document.querySelector('.gold-text');
    if (ageElement && ageElement.textContent.includes('۲۸')) {
        ageElement.textContent = ageElement.textContent.replace('۲۸', toPersianNumbers('۲۸'));
    }
}

// اجرا بعد از لود شدن صفحه
document.addEventListener('DOMContentLoaded', function() {
    updatePersianNumbers();
    
    // همچنین برای تگ‌های خاص
    const elementsToConvert = document.querySelectorAll('.gold-text, .wish-text, .message-content');
    elementsToConvert.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/\d+/g, match => toPersianNumbers(match));
    });
});

// برای تاریخ فارسی
function getPersianDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        calendar: 'persian',
        numberingSystem: 'arab'
    };
    
    try {
        return new Intl.DateTimeFormat('fa-IR', options).format(now);
    } catch (e) {
        // Fallback در صورت خطا
        const persianMonths = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
        const year = 1403; // سال فرضی
        const month = persianMonths[Math.floor(Math.random() * 12)];
        const day = toPersianNumbers(Math.floor(Math.random() * 30) + 1);
        return `${day} ${month} ${toPersianNumbers(year)}`;
    }
}

// نمایش تاریخ فارسی
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.querySelector('#current-date');
    if (dateElement) {
        dateElement.textContent = getPersianDate();
    }
});
// این رو به اسکریپت اضافه کن (اختیاری)
document.addEventListener('DOMContentLoaded', function() {
    // تشخیص پلتفرم
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const isMac = navigator.platform.indexOf('Mac') > -1;
    
    // تغییر داینامیک theme-color
    const updateThemeColor = () => {
        let themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
            themeColor = document.createElement('meta');
            themeColor.name = 'theme-color';
            document.head.appendChild(themeColor);
        }
        
        // رنگ بر اساس پلتفرم
        if (isMobile) {
            themeColor.content = '#a1c4fd'; // آبی روشن برای موبایل
        } else if (isWindows) {
            themeColor.content = '#4a6fa5'; // آبی تیره برای ویندوز
        } else {
            themeColor.content = '#a1c4fd'; // پیش‌فرض
        }
    };
    
    updateThemeColor();
    
    // برای مرورگرهای قدیمی
    document.documentElement.style.setProperty('--theme-color', '#a1c4fd');
});
    
    console.log('🎂 کارت تبریک تولد آماده است!');
});

