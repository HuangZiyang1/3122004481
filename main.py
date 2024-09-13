from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import unittest

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
    def test_cosine_similarity(self):
        test_folder_path = 'text'  # 当前目录下text的文件夹
        texts = read_texts_from_folder(test_folder_path)
        texts_keys, similarities = calculate_cosine_similarity(texts)
        self.assertTrue(all(sim >= 0 for sim in similarities))  # 相似度在0到1之间
        self.assertTrue(all(sim <= 1 for sim in similarities))  # 相似度在0到1之间

if __name__ == '__main__':
    # 运行单元测试
    unittest.main()