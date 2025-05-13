import pickle
import json
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import StringType
import numpy as np
import os

# Đường dẫn đầu vào và đầu ra
input_pkl = 'src/main/resources/scripts/model.pkl'
output_dir = 'src/main/resources/scripts/onx'
output_metadata = 'src/main/resources/scripts/model_metadata.json'

# Tạo thư mục đầu ra nếu chưa tồn tại
os.makedirs(output_dir, exist_ok=True)

# Đọc file pickle
with open(input_pkl, 'rb') as file:
    model_data = pickle.load(file)

gbdt_models = model_data['gbdt_models']
lr_models = model_data['lr_models']
product_list = model_data['product_list']
dummy_columns = model_data['dummy_columns']

# Lưu metadata (product_list và dummy_columns)
metadata = {
    'product_list': product_list,
    'dummy_columns': dummy_columns.tolist()
}
with open(output_metadata, 'w') as f:
    json.dump(metadata, f, indent=2)

# Định nghĩa kiểu dữ liệu đầu vào (19 cột đặc trưng)
initial_types = [('input', StringType([None, len(dummy_columns)]))]

# Xuất mô hình GBDT
for product, model in gbdt_models.items():
    onnx_model = convert_sklearn(model, initial_types=initial_types)
    with open(os.path.join(output_dir, f'gbdt_{product}.onnx'), 'wb') as f:
        f.write(onnx_model.SerializeToString())
    print(f'Exported GBDT model for {product}')

# Xuất mô hình LR
for product, model in lr_models.items():
    onnx_model = convert_sklearn(model, initial_types=initial_types)
    with open(os.path.join(output_dir, f'lr_{product}.onnx'), 'wb') as f:
        f.write(onnx_model.SerializeToString())
    print(f'Exported LR model for {product}')

print(f'Metadata saved to {output_metadata}')