import tensorflow as tf
import os
from tensorflow.keras.preprocessing import image_dataset_from_directory
import splitfolders
import cv2

def blur(img):
    return (cv2.blur(img,(5,5)))

def split_train_test_val(IMG_SIZE, data_path):
    datagen_kwargs = dict(rescale=1./255,
                      validation_split=.20,
                      horizontal_flip=True,
                      rotation_range=20,
                      width_shift_range=0.2,
                      height_shift_range=0.2,
                      brightness_range=[0.2,1.0],
                    #   preprocessing_function= blur
                       )
    valid_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        **datagen_kwargs)
    valid_generator = valid_datagen.flow_from_directory(
        data_path,
        subset='validation',
        shuffle=False,
        target_size=IMG_SIZE,
    )

    train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        **datagen_kwargs)
    train_generator = train_datagen.flow_from_directory(
        data_path,
        subset='training',
        shuffle=False,
        target_size=IMG_SIZE,
        )

    return train_generator, valid_generator


def rescale(model,base_model_name):
    if base_model_name == 'mobilenet':
        preprocess_input = tf.keras.applications.mobilenet.preprocess_input
        return preprocess_input(model)
    if base_model_name == 'vgg16':
        preprocess_input = tf.keras.applications.vgg16.preprocess_input
        return preprocess_input(model)
    if base_model_name == 'mobilenet_v2':
        preprocess_input = tf.keras.applications.mobilenet_v2.preprocess_input
        return preprocess_input(model)
    

def data_augmentation(inputs):
    augmentation = tf.keras.Sequential([
        tf.keras.layers.experimental.preprocessing.RandomFlip('horizontal'),
        tf.keras.layers.experimental.preprocessing.RandomRotation(0.2),
    ])
    return augmentation(inputs)

    