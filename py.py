import pandas as pd
import random

# Tạo ra một danh sách các số ngẫu nhiên không trùng lặp
numbers = random.sample(range(111111111111, 1000000000000), 110000)

# Tạo ra một DataFrame từ danh sách này
df = pd.DataFrame(numbers, columns=['Random Numbers'])

# Xuất DataFrame ra một tệp Excel
df.to_excel('random_numbers1.xlsx', index=False)
