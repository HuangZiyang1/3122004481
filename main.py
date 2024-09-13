from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import unittest
from unittest.mock import patch, mock_open

# 定义一个函数来读取文本文件
def read_texts_from_folder(folder_path):
    texts = {}
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            with open(os.path.join(folder_path, filename), 'r', encoding='utf-8') as file:
                texts[filename] = file.read()
    return texts

# 预处理和文本分割
# 计算余弦相似度
def calculate_cosine_similarity(texts):
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(texts.values())
    original = X[0]  # 第一个是原始文件
    similarities = cosine_similarity(original, X)
    return texts.keys(), similarities[0]

# 打印查重率
def print_similarity_percentage(texts, similarities):
    for name, sim in zip(texts, similarities):
        print(f"{name}: {sim * 100:.2f}%")

# 单元测试
class TestTextSimilarity(unittest.TestCase):
    def setUp(self):
        self.test_folder_path = 'text'

    # 测试mock文件
    @patch('builtins.open', new_callable=mock_open, read_data='Sample text data\nSample text data')
    def test_cosine_similarity_with_mocked_file(self, mocked_file):
        texts = read_texts_from_folder(self.test_folder_path)
        texts_keys, similarities = calculate_cosine_similarity(texts)
        for sim in similarities:
            self.assertAlmostEqual(sim, 1.0, places=7)  # 允许7位小数的误差

    # 测试文件不存在的情况
    def test_folder_not_exist(self):
        with self.assertRaises(FileNotFoundError):
            read_texts_from_folder('non_existent_folder')

    # 测试空文件
    def test_empty_files(self):
        with patch('os.listdir', return_value=['file1.txt', 'file2.txt']), \
             patch('builtins.open', new_callable=mock_open, read_data=''):
            texts = read_texts_from_folder(self.test_folder_path)
            self.assertEqual(len(texts), 2)
            self.assertTrue(all(text == '' for text in texts.values()))

    # 测试英文字符的文件
    def test_files_with_english_characters(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Hello World'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertTrue(all(sim >= 0 for sim in similarities))
            self.assertTrue(all(sim <= 1 for sim in similarities))

    # 测试相同的文件
    def test_files_with_same_content(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Same content'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertAlmostEqual(similarities[0], 1.0)  # 使用assertAlmostEqual

    # 测试不同的文件
    def test_files_with_different_content(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Different content'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertTrue(similarities[0] < 1.0)

    # 测试含有特殊字符的文件
    def test_file_with_special_characters(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Text with special chars: @#$%'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertTrue(all(sim >= 0 for sim in similarities))
            self.assertTrue(all(sim <= 1 for sim in similarities))

    # 测试换行符
    def test_file_with_newline(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Line one\nLine two'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertAlmostEqual(similarities[0], 1.0)  # 使用assertAlmostEqual

    # 测试
    def test_file_with_null_bytes(self):
        with patch('builtins.open', new_callable=mock_open, read_data='Some text'):
            texts = read_texts_from_folder(self.test_folder_path)
            texts_keys, similarities = calculate_cosine_similarity(texts)
            self.assertTrue(all(sim >= 0 for sim in similarities))
            self.assertTrue(all(sim <= 1 for sim in similarities))

    # 测试路径错误
    def test_file_path_error(self):
        with self.assertRaises(OSError):
            read_texts_from_folder('/invalid/path')

if __name__ == '__main__':
    unittest.main()
