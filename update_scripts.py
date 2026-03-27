import os
import re

# Directory to search
root_dir = '.'

# Old script block
old_script = '''fetch('/navbar.html')
  		.then(response => response.text())
  		.then(data => {
    		document.getElementById('navbar').innerHTML = data;
  		});'''

# New script block
new_script = '''fetch('/navbar.html')
  		.then(response => response.text())
  		.then(data => {
    		document.getElementById('navbar').innerHTML = data;
    		// Highlight current page
    		const path = window.location.pathname;
    		const navLinks = document.querySelectorAll('.nav-link');
    		navLinks.forEach(link => {
        		const href = link.getAttribute('href');
        		if (href === path || (path === '/' && href === '/index.html')) {
            		link.classList.add('active');
        		}
    		});
    		// Highlight parent for subpages
    		if (path.startsWith('/subpages_pubs/')) {
        		document.querySelector('a[href="/publications.html"]').classList.add('active');
    		}
    		if (path.startsWith('/subpages_research/')) {
        		document.querySelector('a[href="/research.html"]').classList.add('active');
    		}
  		});'''

# Find all .html files except navbar.html
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.html') and filename != 'navbar.html':
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_script in content:
                content = content.replace(old_script, new_script)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {filepath}')