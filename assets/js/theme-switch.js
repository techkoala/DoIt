class ThemeSwitch {
    constructor() {
        this.themeSelectDesktop = document.getElementById('theme-select-desktop');
        this.themeSelectMobile = document.getElementById('theme-select-mobile');
        this.themeSwitch = document.querySelector('.theme-switch');
        
        this.initializeThemeSelects();
        this.bindEvents();
    }

    initializeThemeSelects() {
        // 获取当前主题
        const currentTheme = localStorage.getItem('theme') || 'auto';
        
        // 设置下拉框的值
        if (this.themeSelectDesktop) {
            this.themeSelectDesktop.value = currentTheme;
        }
        if (this.themeSelectMobile) {
            this.themeSelectMobile.value = currentTheme;
        }
    }

    bindEvents() {
        // 绑定桌面端主题选择事件
        if (this.themeSelectDesktop) {
            this.themeSelectDesktop.addEventListener('change', (e) => {
                this.handleThemeChange(e.target.value);
                if (this.themeSelectMobile) {
                    this.themeSelectMobile.value = e.target.value;
                }
            });
        }

        // 绑定移动端主题选择事件
        if (this.themeSelectMobile) {
            this.themeSelectMobile.addEventListener('change', (e) => {
                this.handleThemeChange(e.target.value);
                if (this.themeSelectDesktop) {
                    this.themeSelectDesktop.value = e.target.value;
                }
            });
        }

        // 绑定主题切换按钮事件
        if (this.themeSwitch) {
            this.themeSwitch.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.handleThemeChange(newTheme);
            });
        }
    }

    handleThemeChange(theme) {
        if (theme === 'auto') {
            // 如果选择了自动模式，使用系统主题
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(systemDark ? 'dark' : 'light');
        } else {
            // 否则使用选择的主题
            setTheme(theme);
        }
        // 保存主题设置
        saveTheme(theme);
        
        // 触发主题切换事件
        if (window.switchThemeEventSet) {
            window.switchThemeEventSet.forEach(handler => {
                handler();
            });
        }
    }
}

// 当DOM加载完成后初始化主题切换
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitch();
});
