from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

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
    original = X[0]  # 假设第一个是原始文件
    similarities = cosine_similarity(original, X)
    return texts.keys(), similarities[0]

# 打印查重率
def print_similarity_percentage(texts, similarities):
    for name, sim in zip(texts, similarities):
        print(f"{name}: {sim * 100:.2f}%")

# 主程序
if __name__ == '__main__':
    # 假设你的文本文件放在当前目录下的 'text' 文件夹中
    folder_path = 'text'
    texts = read_texts_from_folder(folder_path)
    texts_keys, similarities = calculate_cosine_similarity(texts)
    print_similarity_percentage(texts_keys, similarities)
