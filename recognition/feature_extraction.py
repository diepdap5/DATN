import matplotlib.pyplot as plt
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
def create_base_model(num_classes, IMG_SIZE):
    model = tf.keras.Sequential([
        hub.KerasLayer('https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4',
                       output_shape=[1280],
                       trainable=False),
        tf.keras.layers.Dropout(0.4),
        tf.keras.layers.Dense(num_classes,
                              activation='softmax')
    ])
    model.summary()
    model.build([None, IMG_SIZE, IMG_SIZE, 3])
    return model
def create_base_model_2(num_classes, IMG_SIZE):
    base_model = tf.keras.applications.MobileNetV2(weights='imagenet', include_top=False,
                                          input_shape=(IMG_SIZE, IMG_SIZE, 3),
                                          )
    base_model.trainable = False
    model = tf.keras.Sequential([
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dropout(0.4),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    model.summary()
    return model


# Compile the model

def compile_model(model, base_learning_rate):
    model.compile(optimizer=tf.keras.optimizers.Adam(lr=base_learning_rate),
                  loss='categorical_crossentropy',
                  metrics=['acc'])
    model.summary()
    return model

# Train the model


def training(model, initial_epochs, verbose, train_dataset, validation_dataset):
    steps_per_epoch = np.ceil(train_dataset.samples/train_dataset.batch_size)
    val_steps_per_epoch = np.ceil(
        validation_dataset.samples/validation_dataset.batch_size)
    history = model.fit(train_dataset,
                        epochs=initial_epochs,
                        verbose=verbose,
                        steps_per_epoch=steps_per_epoch,
                        validation_data=validation_dataset,
                        validation_steps=val_steps_per_epoch).history
    return history, model

# Learning Curvers


def show_learning_curves(history):
    acc = history['accuracy']
    val_acc = history['val_accuracy']

    loss = history['loss']
    val_loss = history['val_loss']

    plt.figure(figsize=(8, 8))
    plt.subplot(2, 1, 1)
    plt.plot(acc, label='Training Accuracy')
    plt.plot(val_acc, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.ylabel('Accuracy')
    plt.ylim([min(plt.ylim()), 1])
    plt.title('Training and Validation Accuracy')

    plt.subplot(2, 1, 2)
    plt.plot(loss, label='Training Loss')
    plt.plot(val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.ylabel('Cross Entropy')
    plt.ylim([0, 1.0])
    plt.title('Training and Validation Loss')
    plt.xlabel('epoch')
    plt.show()
