from feature_extraction import create_base_model_2, create_base_model
from preprocess import split_train_test_val
from feature_extraction import create_base_model, compile_model, training
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import sys
import tensorflow_hub as hub
import pandas
import json
from save_model import save_class_to_txt, save_model_tflite
import cv2


if __name__ == '__main__':
    np.set_printoptions(threshold=sys.maxsize)
    MUSEUM_NAME = str(sys.argv[1])
    initial_epochs = int(sys.argv[2])

    MUSEUM_DIR = '/home/diepdn/DATN/image_test/' + MUSEUM_NAME + '_data/'
    IMG_SIZE = 224
    # Split train val test datasets
    train_dataset, validation_dataset = split_train_test_val(
        IMG_SIZE=(IMG_SIZE, IMG_SIZE), data_path=MUSEUM_DIR)

    # Create model
    model = create_base_model_2(
        len(train_dataset.class_indices), IMG_SIZE=IMG_SIZE)
    # model.build([None, IMG_SIZE, IMG_SIZE, 3])
    # base_model=tf.keras.applications.MobileNetV2(weights='imagenet',include_top=False,
    # input_shape=(IMG_SIZE,IMG_SIZE,3)) #imports the mobilenet model and discards the last 1000 neuron layer.
    # base_model.trainable = True
    # model = tf.keras.Sequential([base_model,
    #                 tf.keras.layers.GlobalAveragePooling2D(),
    #                 tf.keras.layers.Dense(1024,activation='relu'),
    #                 tf.keras.layers.Dense(1024,activation='relu'),
    #                 tf.keras.layers.Dense(512,activation='relu'),
    #                 tf.keras.layers.Dense(len(train_dataset.class_indices),activation='softmax')
    #                 ])
    # for layer in model.layer[:100]:
    #     layer.trainable=False

    model = compile_model(model=model, base_learning_rate=1e-3)
    history, model = training(model=model,
                              initial_epochs=initial_epochs,
                              verbose=1,
                              train_dataset=train_dataset,
                              validation_dataset=validation_dataset)

    target_names = []
    for key in train_dataset.class_indices:
        target_names.append(key)
    # print(train_dataset.class_indices)
    save_class_to_txt(train_dataset.class_indices, MUSEUM_NAME)

    predict = model.predict(train_dataset)
    y_pred = np.argmax(predict, axis=1)
    print(y_pred)
    print('Confusion matrix')
    con = confusion_matrix(train_dataset.classes, y_pred)
    print('Confusion Report')
    report = classification_report(
        train_dataset.classes, y_pred, target_names=target_names, output_dict=True)
    print(report)
    df = pandas.DataFrame(report).transpose()
    df.to_csv('confusion_report_' + MUSEUM_NAME + '.csv')
    save_model_tflite(model, MUSEUM_NAME)
