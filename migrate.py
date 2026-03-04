import re
import os

css_path = r"C:\Users\binty\OneDrive\Desktop\learner's grove\style.css"
js_path = r"C:\Users\binty\OneDrive\Desktop\learner's grove\script.js"

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# 1. Base HTML & Type Scale
css = re.sub(
    r"(\*\s*\{[^}]+\}\s*)",
    r"\1\nhtml {\n    scroll-behavior: smooth;\n}\n",
    css,
    count=1
)
css = css.replace("font-size: 18px;", "font-size: 16px;")

# 2. Section padding
css = re.sub(r"(\.section\s*\{\s*padding:\s*)120px 0;", r"\1 60px 0;", css)

# 3. Mobile Buttons
btn_replace = """.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    border-radius: 50px;
    font-family: var(--font-heading);
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    border: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    min-height: 48px;
    width: 100%;
}"""
css = re.sub(r"\.btn\s*\{[^}]+\}", btn_replace, css, count=1)

# 4. Flex Row Default
flex_row = """.flex-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 40px;
    text-align: center;
}

.flex-row-reverse {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 40px;
    text-align: center;
}"""
css = re.sub(r"\.flex-row\s*\{[^}]+\}\s*\.flex-row-reverse\s*\{[^}]+\}", flex_row, css)

# 5. Nav bar
nav_links = """.nav-links {
    display: none;
    gap: 25px;
}

.nav-links.nav-active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 90px;
    right: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    gap: 15px;
    width: calc(100% - 40px);
}"""
css = re.sub(r"\.nav-links\s*\{[^}]+\}", nav_links, css, count=1)

mobile_menu = """.mobile-menu {
    display: block;
    font-size: 1.5rem;
    color: var(--color-plum);
    cursor: pointer;
}"""
css = re.sub(r"\.mobile-menu\s*\{[^}]+\}", mobile_menu, css, count=1)

# 6. Grid conversions
css = re.sub(r"grid-template-columns:\s*repeat\([^)]+\);", "grid-template-columns: 1fr;", css)

# 7. Formats adjustments
parents_layout = """.parents-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 40px;
    padding: 20px 0;
}"""
css = re.sub(r"\.parents-layout\s*\{[^}]+\}", parents_layout, css)
css = re.sub(r"\.parents-text \.section-title\s*\{[^}]+\}", ".parents-text .section-title {\n    text-align: center;\n    margin-bottom: 20px;\n}", css)

ebooks_left = """.ebooks-left-e {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: flex-end;
    justify-content: center;
}"""
css = re.sub(r"\.ebooks-left-e\s*\{[^}]+\}", ebooks_left, css)

ebooks_layout = """.ebooks-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}"""
css = re.sub(r"\.ebooks-layout\s*\{[^}]+\}", ebooks_layout, css)

big_stylized = """.big-stylized-e {
    font-size: 7rem;
    font-family: 'Georgia', serif;
    color: var(--color-plum);
    line-height: 0.8;
    text-shadow: 3px 3px 0px var(--color-gold), 6px 6px 0px var(--color-pink);
}"""
css = re.sub(r"\.big-stylized-e\s*\{[^}]+\}", big_stylized, css)

footer_grid = """.footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
    margin-bottom: 40px;
}"""
css = re.sub(r"\.footer-grid\s*\{[^}]+\}", footer_grid, css)
css = re.sub(r"grid-template-columns: 2fr 1fr 1fr 1fr;", "grid-template-columns: 1fr;\n    text-align: center;", css)

stories_vis = """.stories-visual {
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}"""
css = re.sub(r"\.stories-visual\s*\{[^}]+\}", stories_vis, css)

floating_card = """.story-floating-card {
    background: white;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    position: relative;
    width: 100%;
}"""
css = re.sub(r"\.story-floating-card\s*\{[^}]+\}", floating_card, css)

# 8. Media Queries 
marker = "/* ========================================="
index = css.find(marker)
if index != -1:
    css = css[:index]

new_media = '''/* =========================================
   Responsive Layout Breakpoints (Mobile-First)
   ========================================= */

/* Small Mobile Adjustments (Max Width: 400px) */
@media (max-width: 400px) {
    .circular-gallery {
        width: 260px;
        height: 260px;
    }

    .center-circle {
        width: 100px;
        height: 100px;
        font-size: 2.5rem;
    }

    .circle-item {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        transform: rotate(var(--angle)) translate(130px) rotate(calc(var(--angle) * -1));
    }
    .circle-item:hover {
        transform: rotate(var(--angle)) translate(130px) rotate(calc(var(--angle) * -1)) scale(1.15);
    }
}

/* Tablet (Min Width: 768px) */
@media (min-width: 768px) {
    body {
        font-size: 18px;
    }
    
    .section {
        padding: 90px 0;
    }
    
    .btn {
        width: auto;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .stats-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .ebooks-grid-8 {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        text-align: left;
    }
    
    .eq-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .stories-visual {
        flex-direction: row;
        gap: 20px;
        height: auto;
    }
}

/* Desktop (Min Width: 1024px) */
@media (min-width: 1024px) {
    .section {
        padding: 120px 0;
    }

    .nav-links {
        display: flex;
    }

    .nav-links.nav-active {
        display: flex !important;
        position: static;
        flex-direction: row;
        background-color: transparent;
        padding: 0;
        box-shadow: none;
        width: auto;
    }

    .mobile-menu {
        display: none;
    }

    .flex-row {
        flex-direction: row;
        text-align: left;
    }

    .flex-row-reverse {
        flex-direction: row-reverse;
        text-align: left;
    }

    .features-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .paths-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .ebooks-layout {
        flex-direction: row;
        align-items: center;
        gap: 50px;
    }

    .ebooks-left-e {
        flex: 0 0 160px;
        flex-direction: column;
        align-items: center;
    }

    .big-stylized-e {
        font-size: 18rem;
        text-shadow: 6px 6px 0px var(--color-gold), 12px 12px 0px var(--color-pink);
    }

    .ebooks-grid-8 {
        grid-template-columns: repeat(4, 1fr);
    }

    .parents-layout {
        flex-direction: row;
        text-align: left;
        gap: 60px;
    }

    .parents-text .section-title {
        text-align: left;
    }
    
    .eq-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .footer-grid {
        grid-template-columns: 2fr 1fr 1fr 1fr;
    }
    
    /* Restore float card animation for desktop */
    .stories-visual {
        position: relative;
        height: 400px;
        display: block;
    }
    
    .story-floating-card {
        position: absolute;
        width: 80%;
        animation: float 6s ease-in-out infinite;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }

    .top-card {
        top: 50px;
        right: 0;
    }

    .bottom-card {
        bottom: 50px;
        left: 0;
        animation-delay: 1.5s;
    }
}
'''
css += new_media

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

# Update Javascript
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

new_js = '''// Mobile Navigation Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

mobileMenu.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Change Icon
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('nav-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if(window.innerWidth <= 1024) {
            navLinks.classList.remove('nav-active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});
'''

# Replace the first 49 lines of JS with new_js (from Mobile Navigation to end of link click logic)
js_parts = js.split('// Accordion Logic for Parental Guidance')
final_js = new_js + '\n// Accordion Logic for Parental Guidance' + js_parts[1]

with open(js_path, "w", encoding="utf-8") as f:
    f.write(final_js)

print("Migration successful")
