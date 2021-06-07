import os
from PIL import Image
from distutils.dir_util import copy_tree
import sys
import shutil


MUSEUM = str(sys.argv[1])
ROOT_IMAGE_DIR = '/home/diepdn/DATN/image_test/'+ MUSEUM + '/'
TRAINING_IMAGE_DIR = '/home/diepdn/DATN/image_test/'+ MUSEUM +'_data/'

if (os.path.isdir(TRAINING_IMAGE_DIR) == True):
	shutil.rmtree(TRAINING_IMAGE_DIR)

os.mkdir(TRAINING_IMAGE_DIR)
copy_tree(ROOT_IMAGE_DIR, TRAINING_IMAGE_DIR)

list_of_artifact = os.listdir(TRAINING_IMAGE_DIR)
for artifact_folder in list_of_artifact:
    folder_path = TRAINING_IMAGE_DIR + str(artifact_folder) + '/'
    src_folder = os.listdir(folder_path)
    number_files = len(src_folder)
    if (number_files < 20):
        for file_name in src_folder:
            full_file_name = os.path.join(folder_path, file_name)
            for i in range(17):
                im = Image.open(full_file_name)
                im=im.rotate(20 * (i+1), expand=True)
                name = folder_path +'rotated' + str(i) + '.jpg'
                im.save(name)
                number_files += 1
                if number_files == 20:
                    break
            if number_files == 20:
                    break
    if (number_files > 25):
        for i in range(len(src_folder)):
            if i>20:
                full_file_name = os.path.join(folder_path, src_folder[i])
                os.remove(full_file_name)

