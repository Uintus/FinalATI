import cv2
import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt


#________________________________________FUNCTION FOR PROCESSING IMG______________________________________#
# SHOW IMG
def showImg(answer):
        cv2.imshow("Answer", answer)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

# CROP ANSWER FROM IMG
def crop_answer(x, y, width, height, image):
    cropped_image = image[y:y+height, x:x+width]
    return cropped_image

# PROCESS ANSWER FIT TO DATASET
def process_answer(crop_answer):
    # Chuyển ảnh sang ảnh xám
    gray = cv2.cvtColor(crop_answer, cv2.COLOR_BGR2GRAY)

    # Tìm ngưỡng
    thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)[1]

    # Phát hiện đường viền
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Tìm đường viền lớn nhất
    cnt = max(contours, key=cv2.contourArea)

    # Tạo hình chữ nhật bao quanh
    x, y, w, h = cv2.boundingRect(cnt)
    x += 5
    y += 5
    w -= 10
    h -= 10
    # Cắt lấy phần số
    cropped_img = crop_answer[y:y+h, x:x+w]
    # Đảo ngược màu: Chuyển trắng thành đen, đen thành trắng
    result = 255 - cropped_img
    return result


#________________________________________FUNCTION FOR TRAINING MODEL____________________________________#

# Thiết lập định dạng hiển thị số float cho NumPy (không dùng số mũ)
np.set_printoptions(suppress=True, precision=8)

def predict_id(num_img, model):
    # Sử dụng mô hình để dự đoán
    y_predicted = model.predict(num_img)
    
    # Tạo danh sách kết quả với điều kiện xác suất và giá trị lớn hơn 4
    result_with_confidence = [
        int(np.argmax(pred)) if np.max(pred) > 0.7 else -1
        for pred in y_predicted
    ]
    
    return result_with_confidence

def predict_ans(num_img, model):
    # Sử dụng mô hình để dự đoán
    y_predicted = model.predict(num_img)
    
    # Tạo danh sách kết quả với điều kiện xác suất và giá trị lớn hơn 4
    result_with_confidence = [
        int(np.argmax(pred)) if np.max(pred) > 0.7 and np.argmax(pred) <= 4 else -1
        for pred in y_predicted
    ]
    
    return result_with_confidence

#_________________________________________MAIN FOR TRAINING MODEL________________________________________#
def trainning_model():
    # LOAD MNIST
    (X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

    # range from 0-255 -> 0-1
    X_train = X_train/255
    X_test = X_test/255

    # set LAYERS
    # model = keras.Sequential([
    #     keras.layers.Conv2D(4, (3, 3), activation='relu', input_shape=(28, 28, 1)),  # Lớp tích chập với chỉ 4 filters
    #     keras.layers.Flatten(),                                                      # Chuyển đổi thành vector 1D
    #     keras.layers.Dense(10, activation='softmax')                                 # Lớp đầu ra trực tiếp với 10 nodes
    # ])
    model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),  # Chuyển thành vector 1 chiều
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')  # 10 lớp phân loại
    ])

    # OPTIMIZE loss funtion
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',  
        metrics=['accuracy']  
    )

    # TRAIN model
    model.fit(X_train, y_train, epochs=5)

    # TEST model with dataset
    model.evaluate(X_test, y_test)

    return model

#_________________________________________MAIN FOR FROCESSING IMG__________________________________________#
# import tensorflow as tf
# import numpy as np

# def processing_img(image):
#     image = np.array(image)
    
#     # Định nghĩa vùng để cắt ảnh cho identifier và answer
#     std_Identifier = [[1332, 290, 70, 80], [1418, 290, 70, 80], [1500, 290, 70, 80], [1583, 290, 70, 80]]
#     std_answers = [[620, 470, 70, 80], [620, 570, 70, 80], [620, 670, 70, 80], [620, 770, 70, 80], [620, 870, 70, 80],
#                    [1160, 470, 70, 80], [1160, 570, 70, 80], [1160, 670, 70, 80], [1160, 770, 70, 80], [1160, 870, 70, 80]]
    
#     identifier_img = []
#     answers_img = []

#     # Cắt và xử lý từng vùng ảnh cho identifier
#     for region in std_Identifier:
#         x, y, width, height = region
#         cropped = crop_answer(x, y, width, height, image)  # Hàm crop ảnh của bạn
#         processed = process_answer(cropped)  # Hàm xử lý ảnh của bạn
#         identifier_img.append(processed)

#     # Cắt và xử lý từng vùng ảnh cho answer
#     for region in std_answers:
#         x, y, width, height = region
#         cropped = crop_answer(x, y, width, height, image)
#         processed = process_answer(cropped)
#         answers_img.append(processed)

#     # Resize các ảnh về kích thước (28, 28)
#     identifier_img = [tf.image.resize(img, (28, 28)) for img in identifier_img]
#     answers_img = [tf.image.resize(img, (28, 28)) for img in answers_img]

#     # Chuyển ảnh thành grayscale nếu chưa có
#     identifier_img = tf.image.rgb_to_grayscale(identifier_img)
#     answers_img = tf.image.rgb_to_grayscale(answers_img)

#     # Thêm chiều kênh duy nhất (1) nếu cần
#     identifier_img = identifier_img[..., tf.newaxis]  # Thêm chiều kênh vào ảnh
#     answers_img = answers_img[..., tf.newaxis]  # Thêm chiều kênh vào ảnh

#     # Chuyển danh sách ảnh thành tensor
#     identifier_img = tf.stack(identifier_img)  # Tensor: (batch_size, 28, 28, 1)
#     answers_img = tf.stack(answers_img)        # Tensor: (batch_size, 28, 28, 1)

#     # Normalize giá trị về khoảng 0-1
#     identifier_img = tf.cast(identifier_img, tf.float32) / 255.0
#     answers_img = tf.cast(answers_img, tf.float32) / 255.0

#     # Debug kích thước tensor
#     print("Identifier Tensor Shape:", identifier_img.shape)  # Kết quả: (batch_size, 28, 28, 1)
#     print("Answers Tensor Shape:", answers_img.shape)        # Kết quả: (batch_size, 28, 28, 1)

#     return identifier_img, answers_img

def processing_img(image):
    image = np.array(image)

    # Định nghĩa vùng để cắt ảnh cho identifier và answer
    std_Identifier = [[1332, 290, 70, 80], [1418, 290, 70, 80], [1500, 290, 70, 80], [1583, 290, 70, 80]]
    std_answers = [[620, 470, 70, 80], [620, 570, 70, 80], [620, 670, 70, 80], [620, 770, 70, 80], [620, 870, 70, 80],
                   [1160, 470, 70, 80], [1160, 570, 70, 80], [1160, 670, 70, 80], [1160, 770, 70, 80], [1160, 870, 70, 80]]

    identifier_img = []
    answers_img = []

    # Cắt và xử lý từng vùng ảnh cho identifier
    for region in std_Identifier:
        x, y, width, height = region
        cropped = crop_answer(x, y, width, height, image)
        processed = process_answer(cropped)
        processed = cv2.resize(processed, (28, 28))
        print("Processed image shape:", processed.shape)
        processed_gray = cv2.cvtColor(processed, cv2.COLOR_RGBA2GRAY)
        reshaped_pocessed = processed_gray.reshape((28,28,1))
        print("Processed image after reshape:", reshaped_pocessed.shape)
        identifier_img.append(reshaped_pocessed)
    
    # Cắt và xử lý từng vùng ảnh cho answer
    for region in std_answers:
        x, y, width, height = region
        cropped = crop_answer(x, y, width, height, image)
        processed = process_answer(cropped)
        processed = cv2.resize(processed, (28, 28))  # Resize về kích thước (28, 28)
        print("Processed image shape:", processed.shape)
        processed_gray = cv2.cvtColor(processed, cv2.COLOR_RGBA2GRAY)
        reshaped_pocessed = processed_gray.reshape((28,28,1))
        print("Processed image after reshape:", reshaped_pocessed.shape)
        answers_img.append(reshaped_pocessed)

    # print("Before converting to array:")
    # print("Identifier elements:", len(identifier_img))
    # print("Answers elements:", len(answers_img))

    # # Chuyển đổi và kiểm tra lại
    # identifier_img_array = np.array(identifier_img).reshape(-1, 28, 28, 1)
    # answers_img_array = np.array(answers_img).reshape(-1, 28, 28, 1)

    # print("After converting to array:")
    # print("Identifier shape:", identifier_img_array.shape)
    # print("Answers shape:", answers_img_array.shape)

    # Chuyển danh sách ảnh thành tensor và thêm chiều kênh
    identifier_img = np.array(identifier_img) / 255.0  # Normalize
    answers_img = np.array(answers_img) / 255.0  # Normalize

    return identifier_img, answers_img







#_________________________________________MAIN FOR HANDWRITTEN RECOGNIZE=ANSWER+ID__________________________________________#
def handWritten_recog(model, answers_img, identifier_img):
    # USE model with data from user
    # plt.matshow(answers_img[7])
    # plt.show()
    # y_predicted = model.predict(answers_img)
    # print(y_predicted[7])
    result_identifiers=predict_id(identifier_img, model)
    result_answers=predict_ans(answers_img, model)

    print([result_identifiers, result_answers])
    
    return result_identifiers, result_answers


__all__ = ["trainning_model", "processing_img", "handWritten_recog"]