import os

names = os.listdir('js')
names.sort()
names.remove('prelude.js')
names.insert(0, 'prelude.js')


full = ''
for n in names:
    with open('js/' + n, 'r') as f:
        full += f.read() + '\n\n\n'

with open('api.js', 'w') as f:
    f.write(full)
