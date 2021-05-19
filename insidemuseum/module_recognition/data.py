import os
from PIL import Image
def duplicate_data(MUSEUM_DIR):
    list_of_artifact = os.listdir(MUSEUM_DIR)
    for artifact_folder in list_of_artifact:
        folder_path = MUSEUM_DIR + str(artifact_folder) + '/'
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

duplicate_data('../image/kyohaku_data/')
