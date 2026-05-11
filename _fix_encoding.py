import re

# Fix index.html stray Ã characters before already-valid accented chars
filepath = r'c:\Users\HP 15\provivir\frontend-v2\index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

before = len(re.findall(r'Ã(?=[áéíóúñüÁÉÍÓÚÑÜ])', content))
content = re.sub(r'Ã(?=[áéíóúñüÁÉÍÓÚÑÜ])', '', content)

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

remaining = re.findall(r'Ã[áéíóúñüÁÉÍÓÚÑÜ]|diseÃ', content)
print(f'Fixed {before} stray Ã occurrences. Remaining: {remaining}')

# Verify key phrases
checks = ['diseño', 'Contáctanos', '¡Estás', 'información']
for c in checks:
    print(f'  "{c}" present: {c in content}')
