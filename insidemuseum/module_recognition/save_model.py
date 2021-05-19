import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import tensorflow as tf

def connect_to_db():
    cred = credentials.Certificate('.././serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db;

def save_class_to_json(class_dict,MUSEUM_NAME):
    db = connect_to_db()
    class_array = []
    docs = db.collection(u'ethnology').stream()
    doc_dict = {}
    for doc in docs:
        artifact_id = doc.id.split("_")[1]
        doc_dict[artifact_id] = doc.to_dict()["title"]
    for class_name, indices in class_dict.items():
        class_array.append(
            {
                "id": indices,
                "name": class_name,
                "title": doc_dict[class_name]
            }
        )
    # with open("museum_model/class_" + MUSEUM_NAME + ".json", "w") as outfile: 
    #     json.dump(class_array, outfile)

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

    with open('museum_model/model_' + MUSEUM_NAME + '.tflite', 'wb') as f:
        f.write(tflite_model)
    