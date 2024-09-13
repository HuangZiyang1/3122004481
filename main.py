from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 文件内容
path = "C:/Users/Administrator/Documents/WeChat Files/wxid_aoogts1o45er22/FileStorage/File/2024-09/text"
texts = {
    'orig.txt': open(path + '/orig.txt', 'r', encoding='utf-8').read(),
    'orig_0.8_add.txt': open(path+'/orig_0.8_add.txt', 'r', encoding='utf-8').read(),
    'orig_0.8_del.txt': open(path+'/orig_0.8_del.txt', 'r', encoding='utf-8').read(),
    'orig_0.8_dis_1.txt': open(path+'/orig_0.8_dis_1.txt', 'r', encoding='utf-8').read(),
    'orig_0.8_dis_10.txt': open(path+'/orig_0.8_dis_10.txt', 'r', encoding='utf-8').read(),
    'orig_0.8_dis_15.txt': open(path+'/orig_0.8_dis_15.txt', 'r', encoding='utf-8').read(),
}

# 预处理和文本分割
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts.values())

# 计算原始文件与其他文件的余弦相似度
original = X[0]  # 第一个是原始文件
similarities = cosine_similarity(original, X)

# 输出查重率
for name, sim in zip(texts.keys(), similarities[0]):
    print(f"{name}: {sim * 100:.2f}%")
