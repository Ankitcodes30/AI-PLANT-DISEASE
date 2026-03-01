import unittest
import sys
sys.path.append('../src')

from model import create_model

class TestModel(unittest.TestCase):
    
    def test_model_creation(self):
        model = create_model(num_classes=38)
        self.assertIsNotNone(model)
        self.assertEqual(model.output_shape, (None, 38))
    
    def test_model_input_shape(self):
        model = create_model(num_classes=38)
        self.assertEqual(model.input_shape, (None, 224, 224, 3))

if __name__ == '__main__':
    unittest.main()
