import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import tensorflow as tf
import pymongo


def connect_to_db():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    dbo = myclient["museum"]
    return dbo;

def save_class_to_txt(class_dict,MUSEUM_NAME):
    dbo = connect_to_db()
    class_array = []
    docs = dbo[MUSEUM_NAME + "_ja"].find() 

    doc_dict = {}
    for doc in docs:
        artifact_id = doc["organization_item_key"]
        doc_dict[artifact_id] = doc["title"]

    for class_name, indices in class_dict.items():
        class_array.append(
            {
                "id": indices,
                "name": class_name,
                "title": doc_dict[class_name]
            }
        )

    f = open("museum_model/class_" + MUSEUM_NAME + ".txt", "w")
    
    for i in range(len(class_array)):
        if (i==0):
            f.write(class_array[i]["title"])
        else:
            f.write("\n")
            f.write(class_array[i]["title"])
        
    f.close()

def save_model_tflite(model,MUSEUM_NAME):
    model.save('museum_model')

    converter = tf.lite.TFLiteConverter.from_saved_model(
        'museum_model')
    tflite_model = converter.convert()

    with open('/home/diepdn/DATN/recognition/museum_model/model_' + MUSEUM_NAME + '.tflite', 'wb') as f:
        f.write(tflite_model)
    