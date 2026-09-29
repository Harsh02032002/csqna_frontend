import os
import shutil

src = r"e:\osa-data\pixel-perfect-path-47\src\assets\csqna-learner.png"
dst_dir = r"e:\osa-data\csqna-fresh\src\assets"
dst = os.path.join(dst_dir, "csqna-learner.png")

os.makedirs(dst_dir, exist_ok=True)
shutil.copy2(src, dst)
print("Successfully copied csqna-learner.png to csqna-fresh/src/assets!")
