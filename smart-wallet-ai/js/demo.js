// Demo Page JavaScript

// Chat Bot Responses
const botResponses = {
    "كيف يمكنني توفير المال؟": "إليك بعض النصائح الذكية للتوفير:\n\n• راجع مصروفاتك الشهرية وحدد النفقات غير الضرورية\n• ضع هدف ادخار شهري محدد (10-20% من دخلك)\n• استخدم قاعدة 50/30/20: 50% للاحتياجات، 30% للرغبات، 20% للادخار\n• قارن الأسعار قبل الشراء\n• استفد من العروض والخصومات\n\nهل تريد مني إنشاء خطة ادخار مخصصة لك؟",
    
    "ما هي مصروفاتي هذا الشهر؟": "بناءً على تحليل حسابك، إليك ملخص مصروفاتك لهذا الشهر:\n\n• الطعام والمطاعم: 1,200 ريال (30%)\n• التسوق: 800 ريال (20%)\n• المواصلات: 600 ريال (15%)\n• الترفيه: 500 ريال (12.5%)\n• الفواتير: 700 ريال (17.5%)\n• أخرى: 200 ريال (5%)\n\nإجمالي المصروفات: 4,000 ريال\n\nلاحظت زيادة في مصروفات المطاعم بنسبة 15% عن الشهر الماضي. هل تريد نصائح لتقليلها؟",
    
    "أريد خطة ادخار": "ممتاز! سأضع لك خطة ادخار ذكية:\n\n📊 **تحليل وضعك الحالي:**\n• الدخل الشهري: 8,000 ريال\n• المصروفات الأساسية: 4,000 ريال\n• المتاح للادخار: 4,000 ريال\n\n🎯 **خطة الادخار المقترحة:**\n• الادخار الشهري: 1,600 ريال (20%)\n• صندوق الطوارئ: 800 ريال\n• أهداف قصيرة المدى: 500 ريال\n• استثمارات طويلة المدى: 300 ريال\n\n💡 **نصائح للنجاح:**\n• اجعل الادخار تلقائياً\n• ابدأ بمبالغ صغيرة وزد تدريجياً\n• راجع خطتك شهرياً\n\nهل تريد تفعيل هذه الخطة؟",
    
    "default": "شكراً لسؤالك! كمستشار مالي ذكي، يمكنني مساعدتك في:\n\n• تحليل مصروفاتك وإيراداتك\n• وضع خطط ادخار مخصصة\n• تقديم نصائح استثمارية\n• مراقبة أهدافك المالية\n• تحسين عاداتك المالية\n\nما الموضوع المالي الذي تريد مناقشته؟"
};

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const quickBtns = document.querySelectorAll('.quick-btn');

    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, 'user');

        // Clear input
        if (chatInput) chatInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Get bot response after delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1500);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Get bot response
    function getBotResponse(message) {
        const cleanMessage = message.trim();
        
        // Check for exact matches first
        if (botResponses[cleanMessage]) {
            return botResponses[cleanMessage];
        }
        
        // Check for partial matches
        for (const key in botResponses) {
            if (key !== 'default' && cleanMessage.includes(key.substring(0, 5))) {
                return botResponses[key];
            }
        }
        
        return botResponses.default;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        if (chatMessages) {
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Event listeners
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            if (chatInput) {
                sendMessage(chatInput.value);
            }
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatInput.value);
            }
        });
    }

    // Quick question buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            sendMessage(question);
        });
    });
});

// Voice Assistant functionality
document.addEventListener('DOMContentLoaded', function() {
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceStatus = document.getElementById('voiceStatus');
    let isListening = false;

    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        if (voiceStatus) {
            voiceStatus.textContent = 'المتصفح لا يدعم التعرف على الصوت';
        }
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    // Voice responses
    const voiceResponses = {
        "اعرض رصيدي": "رصيدك الحالي هو 15,000 ريال سعودي",
        "كم صرفت هذا الأسبوع": "صرفت هذا الأسبوع 1,200 ريال، بزيادة 200 ريال عن الأسبوع الماضي",
        "اعرض آخر المعاملات": "آخر معاملاتك: شراء من كارفور 150 ريال، دفع فاتورة كهرباء 300 ريال، تحويل لأحمد 500 ريال",
        "فعل التنبيهات": "تم تفعيل التنبيهات الذكية بنجاح"
    };

    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        });
    }

    function startListening() {
        isListening = true;
        voiceBtn.classList.add('active');
        voiceBtn.querySelector('.pulse-ring').style.opacity = '1';
        
        if (voiceStatus) {
            voiceStatus.textContent = 'أستمع إليك الآن...';
        }

        recognition.start();
    }

    function stopListening() {
        isListening = false;
        voiceBtn.classList.remove('active');
        
        if (voiceStatus) {
            voiceStatus.textContent = 'انقر على الميكروفون وقل أمرك';
        }

        recognition.stop();
    }

    // Speech recognition events
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        
        if (voiceStatus) {
            voiceStatus.textContent = `سمعت: "${transcript}"`;
        }

        // Process voice command
        setTimeout(() => {
            processVoiceCommand(transcript);
        }, 1000);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        if (voiceStatus) {
            voiceStatus.textContent = 'حدث خطأ في التعرف على الصوت. حاول مرة أخرى.';
        }
        stopListening();
    };

    recognition.onend = function() {
        stopListening();
    };

    function processVoiceCommand(command) {
        const response = getVoiceResponse(command);
        
        if (voiceStatus) {
            voiceStatus.textContent = response;
        }

        // Use speech synthesis if available
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.lang = 'ar-SA';
            speechSynthesis.speak(utterance);
        }
    }

    function getVoiceResponse(command) {
        const cleanCommand = command.trim().toLowerCase();
        
        for (const key in voiceResponses) {
            if (cleanCommand.includes(key) || key.includes(cleanCommand)) {
                return voiceResponses[key];
            }
        }
        
        return "لم أفهم الأمر. يمكنك قول: اعرض رصيدي، أو كم صرفت هذا الأسبوع";
    }
});

// Interactive features demo
document.addEventListener('DOMContentLoaded', function() {
    const interactiveCards = document.querySelectorAll('.interactive-card');
    const modal = document.getElementById('demoModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');

    // Demo content for each feature
    const demoContent = {
        'spending-analysis': `
            <h2><i class="fas fa-chart-pie"></i> تحليل المصروفات</h2>
            <div class="demo-chart">
                <canvas id="spendingChart" width="400" height="200"></canvas>
            </div>
            <div class="analysis-details">
                <h3>تحليل تفصيلي:</h3>
                <ul>
                    <li><strong>الطعام والمطاعم:</strong> 1,200 ريال (30%) - زيادة 15%</li>
                    <li><strong>التسوق:</strong> 800 ريال (20%) - انخفاض 5%</li>
                    <li><strong>المواصلات:</strong> 600 ريال (15%) - مستقر</li>
                    <li><strong>الترفيه:</strong> 500 ريال (12.5%) - زيادة 10%</li>
                    <li><strong>الفواتير:</strong> 700 ريال (17.5%) - مستقر</li>
                </ul>
                <div class="recommendation">
                    <p><i class="fas fa-lightbulb"></i> <strong>توصية:</strong> يمكنك توفير 300 ريال شهرياً بتقليل مصروفات المطاعم والترفيه.</p>
                </div>
            </div>
        `,
        
        'budget-planner': `
            <h2><i class="fas fa-calculator"></i> مخطط الميزانية</h2>
            <div class="budget-form">
                <h3>أدخل معلوماتك لإنشاء ميزانية ذكية:</h3>
                <div class="form-group">
                    <label>الدخل الشهري:</label>
                    <input type="number" id="monthlyIncome" placeholder="8000" value="8000">
                </div>
                <div class="form-group">
                    <label>الأهداف المالية:</label>
                    <select id="financialGoals">
                        <option>ادخار للطوارئ</option>
                        <option>شراء سيارة</option>
                        <option>سفر</option>
                        <option>استثمار</option>
                    </select>
                </div>
                <button onclick="generateBudget()" class="btn btn-primary">إنشاء الميزانية</button>
                <div id="budgetResult" style="margin-top: 20px;"></div>
            </div>
        `,
        
        'savings-goals': `
            <h2><i class="fas fa-target"></i> أهداف الادخار</h2>
            <div class="savings-goals">
                <div class="goal-item">
                    <h3>صندوق الطوارئ</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 65%;"></div>
                    </div>
                    <p>6,500 / 10,000 ريال (65%)</p>
                </div>
                
                <div class="goal-item">
                    <h3>إجازة صيفية</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 30%;"></div>
                    </div>
                    <p>1,500 / 5,000 ريال (30%)</p>
                </div>
                
                <div class="goal-item">
                    <h3>سيارة جديدة</h3>
                    <div class="progress-bar">
                        <div class="progress" style="width: 15%;"></div>
                    </div>
                    <p>7,500 / 50,000 ريال (15%)</p>
                </div>
                
                <button class="btn btn-primary">إضافة هدف جديد</button>
            </div>
        `,
        
        'notifications': `
            <h2><i class="fas fa-bell"></i> التنبيهات الذكية</h2>
            <div class="notifications-demo">
                <h3>أمثلة على التنبيهات الاستباقية:</h3>
                
                <div class="notification-item urgent">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <h4>تنبيه ميزانية</h4>
                        <p>تجاوزت ميزانية المطاعم بنسبة 25%. اقترح تقليل الطلبات هذا الأسبوع.</p>
                        <small>منذ 5 دقائق</small>
                    </div>
                </div>
                
                <div class="notification-item info">
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <h4>فرصة توفير</h4>
                        <p>متجر إلكترونيات بخصم 30% على المنتج الذي تبحث عنه. وفر 450 ريال!</p>
                        <small>منذ ساعة</small>
                    </div>
                </div>
                
                <div class="notification-item success">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>تحقيق هدف</h4>
                        <p>مبروك! وصلت لـ 65% من هدف صندوق الطوارئ. استمر على هذا المعدل!</p>
                        <small>أمس</small>
                    </div>
                </div>
                
                <div class="notification-settings">
                    <h4>إعدادات التنبيهات:</h4>
                    <label><input type="checkbox" checked> تنبيهات الميزانية</label>
                    <label><input type="checkbox" checked> تنبيهات العروض</label>
                    <label><input type="checkbox"> تنبيهات الفواتير</label>
                    <label><input type="checkbox" checked> تنبيهات الأهداف</label>
                </div>
            </div>
        `
    };

    // Handle interactive card clicks
    interactiveCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            if (demoContent[feature]) {
                modalBody.innerHTML = demoContent[feature];
                modal.style.display = 'block';
                
                // Add specific functionality for budget planner
                if (feature === 'budget-planner') {
                    window.generateBudget = function() {
                        const income = document.getElementById('monthlyIncome').value;
                        const goal = document.getElementById('financialGoals').value;
                        
                        const result = document.getElementById('budgetResult');
                        result.innerHTML = `
                            <div class="budget-breakdown">
                                <h4>ميزانيتك المقترحة:</h4>
                                <div class="budget-item">
                                    <span>الاحتياجات الأساسية (50%):</span>
                                    <strong>${income * 0.5} ريال</strong>
                                </div>
                                <div class="budget-item">
                                    <span>الرغبات (30%):</span>
                                    <strong>${income * 0.3} ريال</strong>
                                </div>
                                <div class="budget-item">
                                    <span>الادخار و${goal} (20%):</span>
                                    <strong>${income * 0.2} ريال</strong>
                                </div>
                            </div>
                        `;
                    };
                }
            }
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add typing animation styles
const typingStyles = document.createElement('style');
typingStyles.textContent = `
    .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2d8f5f;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: scale(1);
            opacity: 0.5;
        }
        30% {
            transform: scale(1.2);
            opacity: 1;
        }
    }
    
    .budget-breakdown {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin-top: 1rem;
    }
    
    .budget-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .progress-bar {
        width: 100%;
        height: 20px;
        background: #eee;
        border-radius: 10px;
        overflow: hidden;
        margin: 0.5rem 0;
    }
    
    .progress {
        height: 100%;
        background: linear-gradient(45deg, #1a5f3f, #2d8f5f);
        transition: width 0.3s ease;
    }
    
    .goal-item {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin-bottom: 1rem;
    }
    
    .notification-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        border-left: 4px solid;
    }
    
    .notification-item.urgent {
        background: #fff5f5;
        border-color: #e53e3e;
    }
    
    .notification-item.info {
        background: #f0f8ff;
        border-color: #3182ce;
    }
    
    .notification-item.success {
        background: #f0fff4;
        border-color: #38a169;
    }
    
    .notification-item i {
        font-size: 1.5rem;
        margin-top: 0.2rem;
    }
    
    .notification-item.urgent i { color: #e53e3e; }
    .notification-item.info i { color: #3182ce; }
    .notification-item.success i { color: #38a169; }
    
    .notification-settings {
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }
    
    .notification-settings label {
        display: block;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
    
    .form-group input,
    .form-group select {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #eee;
        border-radius: 8px;
        font-size: 1rem;
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: #2d8f5f;
    }
`;

document.head.appendChild(typingStyles);
