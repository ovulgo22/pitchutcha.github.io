// Documentação API - JavaScript Interativo
class DocumentationApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.searchData = [];
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupCodeCopy();
        this.setupTabs();
        this.setupMobileMenu();
        this.setupSearch();
        this.setupSidebarNavigation();
        this.loadSearchData();
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            
            if (this.currentTheme === 'light') {
                sunIcon.style.opacity = '1';
                moonIcon.style.opacity = '0';
            } else {
                sunIcon.style.opacity = '0';
                moonIcon.style.opacity = '1';
            }
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.openSearch());
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => this.closeSearch());
        }

        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    this.closeSearch();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        this.openSearch();
                        break;
                    case '/':
                        e.preventDefault();
                        this.openSearch();
                        break;
                }
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = 64;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active sidebar link
                    this.updateActiveSidebarLink(anchor.getAttribute('href'));
                }
            });
        });
    }

    // Code Copy Functionality
    setupCodeCopy() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const codeBlock = e.target.closest('.code-block');
                const code = codeBlock.querySelector('code');
                
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        this.showCopyFeedback(btn);
                    }).catch(() => {
                        // Fallback for older browsers
                        this.fallbackCopyTextToClipboard(code.textContent);
                        this.showCopyFeedback(btn);
                    });
                }
            });
        });
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }

    // Tab Functionality
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                btn.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');

        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                sidebar.classList.toggle('open');
            });

            // Close mobile menu when clicking on sidebar links
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    sidebar.classList.remove('open');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    // Search Functionality
    setupSearch() {
        this.searchModal = document.getElementById('searchModal');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
    }

    openSearch() {
        if (this.searchModal) {
            this.searchModal.classList.add('active');
            this.searchInput.focus();
        }
    }

    closeSearch() {
        if (this.searchModal) {
            this.searchModal.classList.remove('active');
            this.searchInput.value = '';
            this.searchResults.innerHTML = '';
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result"><div class="search-result-title">Nenhum resultado encontrado</div></div>';
            return;
        }

        this.searchResults.innerHTML = results.map(result => `
            <div class="search-result" onclick="app.navigateToResult('${result.id}')">
                <div class="search-result-title">${this.highlightText(result.title, this.searchInput.value)}</div>
                <div class="search-result-description">${this.highlightText(result.description, this.searchInput.value)}</div>
            </div>
        `).join('');
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    navigateToResult(resultId) {
        this.closeSearch();
        const element = document.getElementById(resultId);
        if (element) {
            const headerHeight = 64;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            this.updateActiveSidebarLink(`#${resultId}`);
        }
    }

    // Sidebar Navigation
    setupSidebarNavigation() {
        // Update active link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveSidebarLinkOnScroll();
        });
    }

    updateActiveSidebarLink(href) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.sidebar-link[href="${href}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveSidebarLinkOnScroll() {
        const sections = document.querySelectorAll('.doc-section');
        const headerHeight = 64;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            this.updateActiveSidebarLink(`#${current}`);
        }
    }

    // Load Search Data
    loadSearchData() {
        this.searchData = [
            {
                id: 'getting-started',
                title: 'Primeiros Passos',
                description: 'Guia de introdução para começar a usar nossa API',
                content: 'Bem-vindo à nossa API! Este guia irá ajudá-lo a começar rapidamente com nossa plataforma.'
            },
            {
                id: 'authentication',
                title: 'Autenticação',
                description: 'Como autenticar suas requisições usando tokens Bearer',
                content: 'Nossa API usa autenticação baseada em tokens Bearer. Inclua seu token no cabeçalho Authorization.'
            },
            {
                id: 'users',
                title: 'Usuários',
                description: 'Endpoints para gerenciar usuários em sua aplicação',
                content: 'Gerencie usuários em sua aplicação com nossos endpoints de usuários.'
            },
            {
                id: 'examples',
                title: 'Exemplos',
                description: 'Exemplos práticos em diferentes linguagens de programação',
                content: 'Exemplos práticos de como usar nossa API em diferentes linguagens.'
            },
            {
                id: 'rate-limits',
                title: 'Limites de Taxa',
                description: 'Informações sobre limites de requisições por minuto',
                content: 'Nossa API tem limites de taxa para garantir a estabilidade do serviço.'
            },
            {
                id: 'webhooks',
                title: 'Webhooks',
                description: 'Como configurar e usar webhooks para receber notificações',
                content: 'Webhooks permitem que você receba notificações em tempo real sobre eventos.'
            },
            {
                id: 'pagination',
                title: 'Paginação',
                description: 'Como navegar através de grandes conjuntos de dados',
                content: 'Use paginação para navegar através de grandes conjuntos de dados de forma eficiente.'
            },
            {
                id: 'errors',
                title: 'Tratamento de Erros',
                description: 'Como lidar com erros da API e códigos de status',
                content: 'Entenda os diferentes tipos de erros e como tratá-los adequadamente.'
            }
        ];
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize animations on scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.doc-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Performance optimizations
    optimizePerformance() {
        // Lazy load images (if any are added later)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce scroll events
        const debouncedScrollHandler = this.debounce(() => {
            this.updateActiveSidebarLinkOnScroll();
        }, 100);

        window.addEventListener('scroll', debouncedScrollHandler);
    }
}

// Global copy function for inline onclick handlers
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    
    if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
            showCopyFeedback(button);
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(code.textContent);
            showCopyFeedback(button);
        });
    }
}

function showCopyFeedback(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copiado!';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DocumentationApp();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could send error to analytics service here
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error to analytics service here
});