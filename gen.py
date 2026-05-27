import os
BASE = "C:/Users/Admin/Downloads/design-knowledge-base"
def w(path, html): open(BASE+path, "w", encoding="utf-8").write(html); print("wrote", path)
# test
w("/test2.txt", "hello world from python script")
