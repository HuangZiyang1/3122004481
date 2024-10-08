from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import cProfile


# 定义一个函数来读取文本文件
def read_texts_from_folder(folder_path):
    texts = {}
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                texts[filename] = file.read()
    return texts


# 预处理和文本分割
# 计算余弦相似度
def calculate_cosine_similarity(texts):
    vectorizer = CountVectorizer()
    x = vectorizer.fit_transform(texts.values())
    original = x[0]  # 第一个是原始文件
    similarities = cosine_similarity(original, x[1:])
    return list(texts.keys())[1:], similarities[0]


# 打印查重率
def print_similarity_percentage(texts, similarities):
    for name, sim in zip(texts, similarities):
        print(f"{name}: {sim * 100:.2f}%")


def main():
    texts = read_texts_from_folder('text')
    texts_keys, similarities = calculate_cosine_similarity(texts)
    print_similarity_percentage(texts_keys, similarities)
    pass


if __name__ == '__main__':
    cProfile.run('main()', 'profile_output.main')
