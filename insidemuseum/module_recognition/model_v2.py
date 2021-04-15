from preprocess import split_train_test_val
from feature_extraction import create_base_model, compile_model, training, show_learning_curves
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import sys
import tensorflow_hub as hub
import pandas

if __name__ == '__main__':
    np.set_printoptions(threshold=sys.maxsize)
    MUSEUM_NAME = 'kyohaku'
    MUSEUM_DIR = MUSEUM_NAME + '/'
    IMG_SIZE = 224
    # Split train val test datasets
    train_dataset, validation_dataset = split_train_test_val(
        IMG_SIZE=(IMG_SIZE, IMG_SIZE), data_path=MUSEUM_DIR)

    # Create model
    model = create_base_model(len(train_dataset.class_indices))
    model.build([None, IMG_SIZE, IMG_SIZE, 3])

    model = compile_model(model=model, base_learning_rate=1e-3)
    history, model = training(model=model,
                              initial_epochs=10,
                              verbose=1,
                              train_dataset=train_dataset,
                              validation_dataset=validation_dataset)

    target_names = []
    for key in train_dataset.class_indices:
        target_names.append(key)
    print(train_dataset.class_indices)
    predict = model.predict(train_dataset)
    y_pred = np.argmax(predict, axis=1)
    print(y_pred)
    print('Confusion matrix')
    con = confusion_matrix(train_dataset.classes, y_pred)
    print(con)
    print('Confusion Report')
    report = classification_report(
        train_dataset.classes, y_pred, target_names=target_names, output_dict=True)
    print(report)
    df = pandas.DataFrame(report).transpose()
    df.to_csv('confusion_report_' + MUSEUM_NAME + '.csv')
    model.save('museum_model')

    converter = tf.lite.TFLiteConverter.from_saved_model(
        'museum_model')
    tflite_model = converter.convert()

    with open('museum_model/model_' + MUSEUM_NAME + '.tflite', 'wb') as f:
        f.write(tflite_model)
    
    show_learning_curves(history)
