import sys
sys.path.append('app')
from utils import predict_disease

result = predict_disease('static/uploads/0e94696b-3e0d-4d4c-a712-01197e228cf1___UF.GRC_BS_Lab_Leaf_8641.JPG')
print(result)
