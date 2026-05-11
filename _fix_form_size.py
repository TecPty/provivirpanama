import re

filepath = r'c:\Users\HP 15\provivir\frontend-v2\src\css\components\cta-form.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Compact the form to match the Figma mockup proportions
# Inputs: 44px -> 38px (tighter, matches boceto)
content = content.replace('height: 44px;\n  padding: 0 16px;', 'height: 38px;\n  padding: 0 14px;')
# Form groups spacing: 12px -> 8px
content = content.replace('margin-bottom: 12px;', 'margin-bottom: 8px;')
# Label margin: 8px -> 4px
content = content.replace('margin-bottom: 8px;\n}', 'margin-bottom: 4px;\n}')
# Subtitle margin: 24px -> 12px
content = content.replace('margin-bottom: 24px;\n  line-height: 1.4;', 'margin-bottom: 12px;\n  line-height: 1.4;')
# Submit button: 52px -> 44px
content = content.replace('height: 52px;\n  margin-top: 12px;', 'height: 44px;\n  margin-top: 8px;')
# Footer notes: reduce spacing
content = content.replace('margin-top: 20px;\n  border-top: 1px solid #F1F3F4;\n  padding-top: 16px;',
                           'margin-top: 12px;\n  border-top: 1px solid #F1F3F4;\n  padding-top: 10px;')
# Font size submit: 16px -> 15px
content = content.replace('  font-size: 16px;\n  font-weight: 700;\n  background: var(--color-primary);',
                           '  font-size: 15px;\n  font-weight: 700;\n  background: var(--color-primary);')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('CSS compacted successfully')
print('height check:', 'height: 38px' in content)
print('margin-bottom group check:', 'margin-bottom: 8px' in content)
