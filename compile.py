import os

names = os.listdir('js')
names.sort()
names.remove('prelude.js')
names.insert(0, 'prelude.js')


full = ''
for n in names:
    if n != '.DS_Store':
        with open('js/' + n, 'rb') as f:
            full += str(f.read()) + '\n\n\n'

with open('api.js', 'wb') as f:
    f.write(full)
