
import tensorflow as tf
import numpy as np
# from google.colab import drive
# drive.mount('/content/drive')

# !pip install tensorflow_hub
import tensorflow_hub as hub
print('Starting...')
data_root = ('image/kyohaku')

IMAGE_SHAPE = (224, 224)
TRAINING_DATA_DIR = str(data_root)
datagen_kwargs = dict(rescale=1./255, validation_split=.20)

valid_datagen = tf.keras.preprocessing.image.ImageDataGenerator(**datagen_kwargs)
valid_generator = valid_datagen.flow_from_directory(
TRAINING_DATA_DIR,
subset='validation',
shuffle=True,
target_size=IMAGE_SHAPE
)
print('Variable done...')
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(**datagen_kwargs)
train_generator = train_datagen.flow_from_directory(
TRAINING_DATA_DIR,
subset='training',
shuffle=True,
target_size=IMAGE_SHAPE)

print (train_generator.class_indices)

model = tf.keras.Sequential([
 hub.KerasLayer('https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4', 
 output_shape=[1280],
 trainable=False),
 tf.keras.layers.Dropout(0.4),
 tf.keras.layers.Dense(train_generator.num_classes, activation='softmax')
])
model.build([None, 224, 224, 3])
optimizer = tf.keras.optimizers.Adam(lr=1e-3)
model.compile(
  optimizer=optimizer,
  loss='categorical_crossentropy',
  metrics=['acc'])
model.summary()

steps_per_epoch = np.ceil(train_generator.samples/train_generator.batch_size)
val_steps_per_epoch = np.ceil(valid_generator.samples/valid_generator.batch_size)

hist = model.fit(
    train_generator, 
    epochs=10,
    verbose=1,
    steps_per_epoch=steps_per_epoch,
    validation_data=valid_generator,
    validation_steps=val_steps_per_epoch).history

# !mkdir -p /content/drive/MyDrive/GR/saved_model
model.save('my_model')

converter = tf.lite.TFLiteConverter.from_saved_model('my_model') # path to the SavedModel directory
tflite_model = converter.convert()

with open('my_model/model.tflite', 'wb') as f:
  f.write(tflite_model)