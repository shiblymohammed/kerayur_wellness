import re, sys

with open('docs/Ayur on the beach Nattika .pdf', 'rb') as f:
    data = f.read()

# Match ascii printable text of 5+ chars
blocks = re.findall(rb'[\x20-\x7e]{5,}', data)
filtered = []
for b in blocks:
    s = b.decode('ascii', errors='ignore').strip()
    # Filter out PDF keywords / code headers
    if not re.match(r'^(obj|endobj|xref|trailer|startxref|Catalog|Pages|Page|Type|Filter|Length|FlateDecode|MediaBox|CropBox|ArtBox|BleedBox|TrimBox|ProcSet|XObject|ExtGState|ColorSpace|Font|Encoding|Widths|FontDescriptor|Ascent|CapHeight|Descent|Flags|FontBBox|FontFamily|FontFile|FontName|FontStretch|FontWeight|ItalicAngle|StemV|XHeight|PieceInfo|Illustrator|LastModified|Adobe|RGB|CMYK|DeviceRGB|DeviceCMYK|ICCBased|R\d+|Im\d+|GS\d+|CS\d+|TT\d+)', s):
        if len(s) > 8 and not re.match(r'^[0-9\s]+$', s):
            filtered.append(s)

print(f"Total filtered text snippets: {len(filtered)}")
unique_snippets = sorted(list(set(filtered)))
print(f"Unique snippets count: {len(unique_snippets)}")

for item in unique_snippets:
    if len(item) > 10:
        print("-", item)
